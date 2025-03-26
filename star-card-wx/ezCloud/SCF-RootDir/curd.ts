// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
const {
	model = "account",
	operate = "列表", //新增 列表 编辑 删除  详情 create, read, update, delete, detail
	isForceDelete = false, //删除时，传入表示是否为强制删除
	data_pk, //编辑、删除、详情时传入
	where,
	order_by,
	page_index = 1,
	page_size = 100,
	fields = "id",
	variables,
	mode = 'manager',
	aggregate = ["count"], //聚合查询
} = payload
if (!model || !fields) throw new Error(`model和fields必须传入`);

const {
	_opReplaceData = {}, //修改时，替换字段
	...data //新增、编辑时传入
} = payload.data || {};
const _opFields = { alias: model, name: model, args: {}, fields: fields };
const _opReplace = [];
const _operate = {
	opMethod: "query",
	opName: model,
	opArgs: {},
	opFields: _opReplaceData.name ? (_opReplace.push(_opFields) && _opReplace) : _opFields,
	variables,
}
if (['新增', '编辑', '删除', 'create', 'read', 'update'].includes(operate) && mode == 'manager') permissionVerification(false, mode);//是否验证权限，默认不验证
switch (operate) {
	case "列表": case "read": queryDATA(); break;
	case "详情": case "detail": queryDATA_pk(); break;
	case "新增": case "create": insertDATA(); break;
	case "编辑": case "update": updateDATA(); break;
	case "删除": case "delete": deleteDATA(); break;
	default:
		throw new Error(`不存在的operate，可选值：1.新增/create 2.列表/read 3.编辑/update 4.删除/delete 5.详情/detail`)
}
if (["列表", "read"].includes(operate)) {
	const _aggregate = _opFields.name + "_aggregate";
	_operate.opFields = [{
		alias: _aggregate,
		name: _aggregate,
		args: { where },
		fields: [{
			name: "aggregate",
			fields: aggregate
		}]
	}, _opFields]
	const { response: result } = ezcloud.operate(_operate);
	const { count, ...response } = result?.[_aggregate]?.aggregate ?? {};
	return {
		// _opFields,
		total_size: count,
		aggregate: response,
		list: result[_opFields.name]
	}
}
const { response: result } = ezcloud.operate(_operate);
const response = result?.[model];
if (!response) return ezcloud.fail({ _opFields, payload, result }, "操作失败", -1)
// response._opFields = _opFields;
return response

//查询
function queryDATA() {
	const args = {};
	if (where) args.where = where;
	if (page_size) args.limit = page_size
	if (order_by) args.order_by = order_by
	if (page_index && page_size) args.offset = (page_index - 1) * page_size
	_opFields.args = args;
	_opFields.name = model;
}
function queryDATA_pk() {
	if (!data_pk) throw new Error("data_pk必须传入")
	_opFields.args.id = data_pk
	_opFields.name = `${model}_by_pk`
}
//新增
function insertDATA() {
	_operate.opMethod = "mutation";
	if (!data) throw new Error("data必须传入");
	if (Array.isArray(data)) {
		_opFields.name = `insert_${model}`
		_opFields.args[`objects`] = data
		_opFields.fields = ["affected_rows ", {
			name: "returning",
			fields
		}]
	} else {
		_opFields.name = `insert_${model}_one`
		_opFields.args[`object`] = data
	}
}
//修改
function updateDATA() {
	_operate.opMethod = "mutation";
	if (!data) throw new Error("data必须传入");
	if (!data_pk) throw new Error("data_pk必须传入");
	const { _set = {}, _inc = {}, ...other } = data;
	_opFields.args[`_set`] = { ...other, ..._set, };
	if (Object.keys(_inc).length > 0) _opFields.args[`_inc`] = _inc;
	const isArray = Array.isArray(data_pk);
	//如果传入的是数组，则批量删除
	if (isArray) _opFields.args[`where`] = { id: { _in: data_pk } };
	else _opFields.args[`pk_columns`] = { id: data_pk }

	_opFields.name = `update_${model}` + (!isArray ? "_by_pk" : '');

	//替换数据
	if (_opReplaceData.name) {
		if (_opReplaceData.old.length > 0) _opReplace.push({
			name: `delete_${_opReplaceData.name}`,
			args: {
				where: { id: { _in: _opReplaceData.old } },
			},
			fields: ["affected_rows"]
		})
		if (_opReplaceData.new.length > 0) _opReplace.push({
			name: `insert_${_opReplaceData.name}`,
			args: {
				objects: _opReplaceData.new.map(item => ({
					...item,
					[`${model}_${model}`]: data_pk
				})),
			},
			fields: ["affected_rows"]
		})
	}
}
//删除
function deleteDATA() {
	_operate.opMethod = "mutation";
	if (!data_pk) throw new Error("data_pk必须传入");
	const isArray = Array.isArray(data_pk);

	//如果传入的是数组，则批量删除
	if (isArray) _opFields.args[`where`] = { id: { _in: data_pk } };
	else if (isForceDelete === true) _opFields.args['id'] = data_pk;
	else _opFields.args[`pk_columns`] = { id: data_pk }

	//判断真删除还是假删除
	if (isForceDelete === true) {
		_opFields.name = `delete_${model}` + (!isArray ? "_by_pk" : '');
	} else {
		_opFields.name = `update_${model}` + (!isArray ? "_by_pk" : '');
		_opFields.args[`_set`] = { is_deleted: true }
	}

	//是否需要包裹返回值
	if (isArray) _opFields.fields = ["affected_rows ", {
		name: "returning",
		fields
	}]
}

//进行相应功能的权限验证
function permissionVerification(is, mode) {
	if (!is) return;
	const clientinfo = ezcloud.getClientinfo(); //判断是否登录
	//需要登录后才能操作
	const { id: manager_pk } = ezcloud.parseJwtToken(clientinfo?.token ?? '', mode || "manager");
}
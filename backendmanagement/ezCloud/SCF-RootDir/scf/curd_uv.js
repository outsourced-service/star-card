const { success, callScf, genJwtToken, parseJwtToken, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo(); //判断是否登录
//获取用户token信息
const userInfo = (() => {
	try {
		return parseJwtToken(clientinfo?.token ?? '');
	} catch (error) {
		throw fail("用户未登录", 101, getRequest());
	}
})();
const TIME = new Date().getTime();
const {
	model = "user_uv",//表名
	modelID = 1,//主键ID
	fields = ["id is_collect is_like share_times visit_times last_visit_time"], //string | Array[string] 字段
	modelFather = "user",//父表名
	modelFatherID = 1,//父表主键ID
	operate = "switch",//1.switch(开关) 2.count(计数) 3.time(时间)
	keyFields = "is_like",//操作的字段
	_set = {
		last_visit_time: TIME,
	}, //其他需要修改的字段
	_inc = [], //其他需要增加计数的字段
	object = { is_collect: false, is_like: false, share_times: 0, visit_times: 0, last_visit_time: null }, //新增数据
} = payload
const uv = queryFun();
if (operate === 'switch') _set[keyFields] = !uv[keyFields];
// else if (mode === 'count') _set[keyFields] = uv[keyFields] + 1;
else if (mode === 'time') _set[keyFields] = TIME;
else throw new Error(`不存在的operate，可选值：1.switch(开关) 2.count(计数) 3.time(时间)`);

//更新数据
return ezcloud.mutation({
	name: `update_${model}_by_pk`,
	args: {
		_set: _set,
		_inc: _inc.reduce((pre, cur) => ({ ...pre, [cur]: 1 }), {}),
		fields: fields,
		where: { id: { _eq: uv.id } }
	},
	onInited: ({ gql, viriables }) => { }
})

//查询数据是否存在,不存在直接新增
function queryFun() {
	const [result] = modelID ? ezcloud.query({
		name: model,
		args: { limit: 1, where: { id: { _eq: modelID } } },
		fields: fields,
		onInited: ({ gql, viriables }) => { }
	}) : {};
	if (!result?.id) return result;
	return ezcloud.mutation({
		name: `insert_${model}_by_pk`,
		args: {
			object: {
				...object,
				[modelFather]: modelFatherID,
			},
			fields: fields
		},
		onInited: ({ gql, viriables }) => { }
	})
}
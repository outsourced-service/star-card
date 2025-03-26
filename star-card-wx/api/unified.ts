/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ezInstance from '/@/utils/ezInstance';// 引入ezcloud工具，用于执行数据操作  
const { api, ezserver } = ezInstance

/**  
 * 统一插入模板  
 * @param {String} model 数据表名称  
 * @param {Array<Object> | Object} data 要插入的数据，可以是单个对象或对象数组  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，用于指定插入或更新的字段  
 * @param {Object} config 额外的配置信息  
 * @returns {Promise} 返回异步操作的结果  
 */
const setInc = async (model : String, data : Array<Object> | Object, fields : Array<Object | string> | string | undefined, config : Object = {}) => {
	return await api('/', 'curd', {
		model: model, //数据表名称
		operate: '新增',
		data,
		fields
	}, Object.keys(config).length > 0 ? config : { isReqLoading: false, text: "新增中..." });
}
/**  
 * 统一删除模板  
 * @param {String} model 数据表名称  
 * @param {Array<Number> | Number} ID 要删除的数据的主键，可以是单个主键或主键数组  
 * @param {Boolean} isForceDelete 是否强制删除，某些情况下可能需要此选项  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，此处可能未使用  
 * @param {Object} config 额外的配置信息  
 * @returns {Promise} 返回异步操作的结果  
 */
const setDel = async (model : String, ID : Array<Number> | Number, isForceDelete : Boolean, fields : Array<Object | string> | string | undefined, config : Object = {}) => {
	return await api('/', 'curd', {
		model: model, //数据表名称
		operate: '删除',
		data_pk: ID,
		isForceDelete,
		fields
	}, Object.keys(config).length > 0 ? config : { isReqLoading: false, text: "删除中..." });
}
/**  
 * 统一修改模板  
 * @param {String} model 数据表名称  
 * @param {Array<Number> | Number} ID 要修改的数据的主键，可以是单个主键或主键数组  
 * @param {Object} data 修改后的数据  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，用于指定更新哪些字段  
 * @param {Object} config 额外的配置信息  
 * @returns {Promise} 返回异步操作的结果  
 */
const setUpd = async (model : String, ID : Array<Number> | Number, data : Object, fields : Array<Object | string> | string | undefined, config : Object = {}) => {
	return await api('/', 'curd', {
		model: model, //数据表名称
		operate: '编辑',
		data_pk: ID,
		data,
		fields
	}, Object.keys(config).length > 0 ? config : { isReqLoading: false, text: "修改中..." });
}

/**  
 * 统一查询模板（分页查询）  
 * @param {String} model 数据表名称  
 * @param {Object} inpus 查询条件  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，用于指定返回哪些字段  
 * @param {Object} config 额外的配置信息  
 * @returns {Promise} 返回异步查询的结果  
 */
const getQue = async (model : String, inpus : Object, fields : Array<Object | string> | string | undefined, config : Object = {}) => {
	return await api('/', 'curd', {
		model: model, //数据表名称
		operate: '列表',
		page_index: 1, // 默认第一页  
		page_size: 100, // 默认每页100条  
		...inpus, // 展开查询条件  
		fields
	}, config || {});
}

/**  
 * 统一查询模板（单条记录查询）  
 * @param {String} model 数据表名称  
 * @param {Number} ID 要查询的数据的主键  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，用于指定返回哪些字段  
 * @param {Object} config 额外的配置信息  
 * @returns {Promise} 返回异步查询的结果  
 */
const getQueOne = async (model : String, ID : Number, fields : Array<Object | string> | string | undefined, config : Object = {}) => {
	return api('/', 'curd', {
		model: model, //数据表名称
		operate: '详情',
		data_pk: ID,
		fields
	}, config || {});
}

/**  
 * 合并增删改查功能，为指定模型提供统一的CRUD接口  
 * @param {String} model 数据表名称  
 * @param {Array<Object | string> | string | undefined} fields 字段列表，用于查询和更新操作  
 * @returns {Object} 包含增删改查操作的对象  
 */
const initUnified = function name(model : String, fields : Array<Object | string> | string | undefined) {
	const MODEL = model;
	const FIELDS = Array.isArray(fields) ? fields : fields ? [fields] : [];
	return {
		inc: (data : Object | Object[], config ?: Object) => setInc(MODEL, data, undefined, config || {}),
		del: (ID : Number, isForceDelete : Boolean | null, config ?: Object) => setDel(MODEL, ID, isForceDelete || false, undefined, config || {}),
		set: (ID : Number | Number[], data : any, config ?: Object) => setUpd(MODEL, ID, data, undefined, config || {}),
		get: (inputs : Object, config ?: Object) => getQue(MODEL, inputs, FIELDS, config || {}),
	};
}

export { getQue, getQueOne, setInc, setUpd, setDel, initUnified };
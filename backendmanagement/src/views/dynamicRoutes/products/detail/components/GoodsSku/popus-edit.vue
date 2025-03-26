<template>
	<div class="goods-sku-dialog-container">
		<el-dialog title="商品规格" v-model="dialog.isShowDialog" label-width="auto" width="70%" :close="closeDialog">
			<el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" label-width="100px" :rules="dialog.rules"
				label-position="left">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="sku名称" prop="sku_name">
							<el-input v-model="dialog.ruleForm.sku_name" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态" prop="status">
							<el-select v-model="dialog.ruleForm.status" placeholder="请选择状态"
								:disabled="!dialog.ruleForm?.id">
								<el-option label="已下架" value="已下架" />
								<el-option label="展示中" value="展示中" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="支付价格" prop="price">
							<el-input-number v-model="dialog.ruleForm.price" :precision="2" :step="0.1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="原价" prop="original_price">
							<el-input-number v-model="dialog.ruleForm.original_price" :precision="2" :step="0.1"
								:min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="库存" prop="stock">
							<el-input-number v-model="dialog.ruleForm.stock" :precision="0" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="赠送积分" prop="present_score">
							<el-input-number v-model="dialog.ruleForm.present_score" :precision="0" :step="1"
								:min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="成长值" prop="growth_value">
							<el-input-number v-model="dialog.ruleForm.growth_value" :precision="0" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="真实销量" prop="sales">
							<el-input-number v-model="dialog.ruleForm.sales" :precision="0" :step="1" :min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="虚拟销量" prop="fictitious_sales">
							<el-input-number v-model="dialog.ruleForm.fictitious_sales" :precision="0" :step="1"
								:min="0" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-table :data="dialog.ruleForm.goods_sku_attri_spec.data" border style="width: 100%">
							<el-table-column v-slot="{ row }" prop="sku_name" label="属性名" min-width="120">
								<el-form-item label="" prop="goods_attri_goods_attri" label-width="0">
									<el-select v-model="row.goods_attri_goods_attri" filterable allow-create
										default-first-option :reserve-keyword="false" placeholder="请选择或输入属性名" clearable
										style="width: 100%" size="default">
										<!-- :remote-method="(query = '') => getOption('goodsAttriArr', query)"
										:loading="goodsAttriArr?.loading"
										@change="(val = 0) => getOption('goodsAttriSpec', '', true, val)"
										@clear="getOption('goodsAttriArr', '', true)"  -->
										<el-option v-for="cat in goodsAttriArr?.list ?? []" :key="cat.id"
											:label="cat.name" :value="cat.id" />
									</el-select>
								</el-form-item>
							</el-table-column>
							<el-table-column v-slot="{ row }" prop="sku_name" label="属性值" min-width="120">
								<el-form-item label="" prop="goods_attri_spec_goods_attri_spec" label-width="0">
									<el-select v-model="row.goods_attri_spec_goods_attri_spec" filterable allow-create
										default-first-option :reserve-keyword="false" placeholder="请选择或输入属性值"
										style="width: 100%" size="default" clearable
										:disabled="!row.goods_attri_goods_attri">
										<!-- 
										:remote-method="(query = '') => getOption('goodsAttriSpec', query)"
										:loading="goodsAttriSpec?.loading" 
										@clear="getOption('goodsAttriSpec', '', true, row.goods_attri_goods_attri)"
										-->
										<el-option v-for="cat in getGoodsAttriSpec(row.goods_attri_goods_attri) ?? []"
											:key="cat.id" :label="cat.value" :value="cat.id" />
									</el-select>
								</el-form-item>
							</el-table-column>
							<el-table-column v-slot="{ $index }" label="操作" min-width="120">
								<el-button type="success" icon="Plus" circle size="small"
									@click="dialog.ruleForm.goods_sku_attri_spec.data.push({})" />
								<el-button v-if="dialog.ruleForm.goods_sku_attri_spec.data.length > 1" type="danger"
									icon="Minus" circle size="small"
									@click="dialog.ruleForm.goods_sku_attri_spec.data.splice($index, 1)" />
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="closeDialog">取 消</el-button>
					<el-button size="default" type="primary" @click="onSubmit">{{ dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';
import { convertCNYtoCent } from '/@/utils/amountConversion';

// 获取商品规格的接口
const curdFun = shoppingMall.goods_sku();
const goodsAttriAPI = shoppingMall.goods_attri();
const goodsAttriSpecAPI = shoppingMall.goods_attri_spec();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
const ruleForm = {
	goods_goods: null,
	id: null,
	sku_name: '',
	price: 0,
	original_price: 0,
	stock: 0,
	present_score: 0,
	growth_value: 0,
	sales: 0,
	fictitious_sales: 0,
	status: '展示中',
	goods_sku_attri_spec: {
		data: <any>[{
			goods_attri_goods_attri: null,
			goods_attri_spec_goods_attri_spec: null,
		}],
	}
}

const dialog = reactive({
	row: <any>{},
	isShowDialog: false,
	ruleForm: { ...ruleForm },
	type: 'edit',
	title: '设置商品规格',
	submitTxt: '确认',
	rules: {
		sku_name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
		price: [{ required: true, message: '请输入支付价格', trigger: 'blur' }],
		original_price: [{ required: true, message: '请输入原价', trigger: 'blur' }],
		stock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
		present_score: [{ required: true, message: '请输入赠送积分', trigger: 'blur' }],
		growth_value: [{ required: true, message: '请输入成长值', trigger: 'blur' }],
		sales: [{ required: true, message: '请输入真实销量', trigger: 'blur' }],
		fictitious_sales: [{ required: true, message: '请输入虚拟销量', trigger: 'blur' }],
		status: [{ required: true, message: '请选择状态', trigger: 'change' }],
	},
});

// 获取商品分类
const defaultObj = {
	list: <any>[],
	loading: false,
	total: 0,
	page: 0,
	pageSize: 0,
}
const goodsAttriArr = ref({
	...defaultObj,
	API: goodsAttriAPI,
	where: (name: any) => ({
		goods_goods: { _eq: dialog.ruleForm.goods_goods },
		name: name ? { _ilike: `%${name}%` } : {}
	})
});
const goodsAttriSpec = ref({
	...defaultObj,
	API: goodsAttriSpecAPI,
	where: (value: any) => ({
		goods_attri: {
			goods_goods: { _eq: dialog.ruleForm.goods_goods },
		},
		value: value ? { _ilike: `%${value}%` } : {}
	})
});

// 打开弹窗
const curdFormRef = ref();
const openDialog = async (row: any) => {
	dialog.row = row; // 复制行数据
	curdFormRef.value?.resetFields(); // 重置表单
	dialog.ruleForm = Object.assign({ ...ruleForm }, JSON.parse(JSON.stringify({
		...row,
		goods_sku_attri_spec: {
			data: row?.goods_sku_attri_spec?.length > 0 ? row.goods_sku_attri_spec : <any>[{
				goods_attri_goods_attri: null,
				goods_attri_spec_goods_attri_spec: null,
			}],
		}
	})))
	// 复制行数据
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑商品规格' : '新增商品规格';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.isShowDialog = true;
	if (!row.id) dialog.ruleForm.status = '已下架';
	await getOption('goodsAttriArr', '');
};

// 提交
const onSubmit = () => {
	curdFormRef.value.validate((valid: any) => {
		if (valid) {
			if (dialog.type === 'add') onAdd(dialog.ruleForm);
			if (dialog.type === 'edit') onUpd(dialog.ruleForm);
		}
	});
};

// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, goods_sku_attri_spec, ...set } = ruleForm;
		const goodsSkuAttriSpec = goods_sku_attri_spec?.data ?? []
		const _opReplaceData = {
			name: 'goods_sku_attri_spec',
			old: dialog.row.goods_sku_attri_spec.filter((old: any) => (!goodsSkuAttriSpec.some((spec: any) => {
				return old.goods_attri_goods_attri === spec.goods_attri_goods_attri && old.goods_attri_spec_goods_attri_spec === spec.goods_attri_spec_goods_attri_spec
			}))).map((old: any) => old.id),
			new: goodsSkuAttriSpec.filter((spec: any) => (!dialog.row.goods_sku_attri_spec.some((old: any) => {
				return old.goods_attri_goods_attri === spec.goods_attri_goods_attri && old.goods_attri_spec_goods_attri_spec === spec.goods_attri_spec_goods_attri_spec
			}))).map((spec: any) => ({
				goods_attri_goods_attri: spec.goods_attri_goods_attri,
				goods_attri_spec_goods_attri_spec: spec.goods_attri_spec_goods_attri_spec,
			}))
		}
		await curdFun.set(id, {
			...set,
			_opReplaceData
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '修改成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消修改',
		});
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该商品规格吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const { id, price, original_price, ...inc } = ruleForm;
		await curdFun.inc({
			price: convertCNYtoCent(price),
			original_price: convertCNYtoCent(original_price),
			...inc,
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '添加成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消添加',
		});
	});
};

const getGoodsAttriSpec = (ID = null) => {
	return goodsAttriArr.value.list.find((item: any) => item.id === ID)?.goods_attri_spec ?? [];
}

const getOption = async (type: string, query: string, clear = false) => {
	const ref = type === 'goodsAttriArr' ? goodsAttriArr : goodsAttriSpec;
	// 如果已经有数据了，但没有进行搜索，就不需要再获取了
	if (ref.value.list.length > 0 && !query && !clear) return;
	ref.value.loading = true;
	const response = await ref.value.API.get({
		page_index: ref.value.page,
		page_size: ref.value.pageSize,
		where: ref.value.where(query),
		order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
	});
	ref.value.list = response.list;
	ref.value.total = response.total_size;
	ref.value.loading = false;
}

// 关闭弹窗
const closeDialog = () => {
	dialog.isShowDialog = false;
	curdFormRef.value?.resetFields(); // 重置表单
};

// 暴露变量
defineExpose({
	openDialog,
	closeDialog,
});
</script>

<style scoped>
.goods-sku-dialog-container {
	padding: 20px;
}
</style>

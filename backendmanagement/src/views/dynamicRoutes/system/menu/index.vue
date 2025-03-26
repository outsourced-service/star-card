<template>
	<div class="system-user-container layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<el-input size="default" v-model="tableData.search" class="ml10" placeholder="请输入菜单名称"
						style="max-width: 180px" clearable @clear="getTableData" />
					<el-button size="default" type="primary" class="ml10" @click="getTableData">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
					<el-button size="default" type="success" class="ml10" @click="openDialog({})">
						<el-icon>
							<ele-FolderAdd />
						</el-icon>
						新增
					</el-button>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" row-key="path" border
				:tree-props="{ children: 'children_menu', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.name" />
						<!-- <span class="ml10">{{ $t(scope.row.name) }}</span> -->
						<span class="ml10">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip />
				<el-table-column prop="idx" label="路由排序" show-overflow-tooltip />
				<el-table-column prop="component" label="文件路径" show-overflow-tooltip />
				<el-table-column prop="meta" label="描述信息" show-overflow-tooltip />
				<!-- {
					title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
					isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`
					isHide：        是否隐藏此路由
					isKeepAlive：   是否缓存组件状态
					isAffix：       是否固定在 tagsView 栏上
					isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
					roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
					icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加`fa xxx`
				} -->
				<el-table-column label="类型" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" fixed="right">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="openDialog(scope.row)">编辑</el-button>
						<el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="60%" @close="onCancel">
			<el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" label-width="auto" :rules="dialog.rules">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级菜单">
							<el-cascader :options="dialog.menuData"
								:props="{ checkStrictly: true, value: 'path', label: 'title' }" placeholder="请选择上级菜单"
								clearable class="w100" v-model="dialog.menuSuperior" @change="onMenuChange">
								<template #default="{ node, data }">
									<span>{{ data.title }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称">
							<el-input v-model="dialog.ruleForm.name" placeholder="请输入菜单名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序">
							<el-input v-model="dialog.ruleForm.idx" type="number" placeholder="请输入菜单排序"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由路径">
							<el-input v-model="dialog.ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="resource">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
import { useRoutesList } from '/@/stores/routesList';
import { i18n } from '/@/i18n/index';
import { storeToRefs } from 'pinia';
import rules from './rules';
import { mprApi } from '/@/api/system/index';
const curdFun = mprApi('menu');
const stores = useRoutesList();
const { routesList } = storeToRefs(stores);

// 定义变量内容
const curdFormRef = ref<FormInstance>();
const tableData = reactive(<any>{
	loading: false,
	search: '',
	type: '',
	optionsSelectAll: [],
	optionsDirSelectAll: [],
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 100,
	},
});
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	title: '',
	submitTxt: '',
	rules: rules,
	menuData: [] as RouteItems, // 上级菜单数据
	menuSuperior: [], // 上级菜单
	ruleForm: <any>{
		id: 0,
	},
});

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	const { list, total_size } = await curdFun.get({
		order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
		where: {
			name: tableData.search ? {
				_ilike: `%${tableData.search}%`
			} : {}
		},
	});
	if (list && Array.isArray(list)) {
		tableData.data = list;
	} else {
		tableData.data = [];
	}
	tableData.total = total_size;
	tableData.loading = false;
};

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await curdFun.del(row.id, false).then(() => {
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
				getTableData();
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消删除',
			});
		});
};
// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id, icon, ...inc } = ruleForm;
			await curdFun
				.inc({
					...inc,
					is_active: true,
				})
				.then(() => {
					ElMessage({
						type: 'success',
						message: '添加成功',
					});
					getTableData();
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消添加',
			});
		});
};
// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改当前数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, children_menu, icon, ..._set } = ruleForm;
			await curdFun
				.set(ID, _set)
				.then(() => {
					ElMessage({
						type: 'success',
						message: '修改成功',
					});
					getTableData();
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消修改',
			});
		});
};

//初始化
const openDialog = (row: any = {}) => {
	dialog.menuData = getMenuData(routesList.value);
	if (curdFormRef.value) curdFormRef.value.resetFields();
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.isShowDialog = true;
	onMenuChange(dialog.menuSuperior);
};
// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!curdFormRef.value) return;
	curdFormRef.value.resetFields();
	dialog.menuSuperior = [];
};
// 启动新增或删除
const onSubmit = () => {
	if (curdFormRef.value)
		curdFormRef.value.validate((valid: any) => {
			if (valid) {
				if (dialog.type === 'add') onAdd(dialog.ruleForm);
				if (dialog.type === 'edit') onUpd(dialog.ruleForm);
			}
		});
};
// 获取 pinia 中的路由
const getMenuData = (routes: RouteItems) => {
	const arr: RouteItems = [];
	routes.map((val: RouteItem) => {
		val['title'] = i18n.global.t(val.meta?.title as string);
		arr.push({ ...val });
		if (val.children) getMenuData(val.children);
	});
	return arr;
};
// 解析选择的父级路由
const onMenuChange = (value: any) => {
	if (!value.length) return;
	const subPath = value[value.length - 1];
	const found = tableData.data.find((item: any) => {
		if (item.path === subPath) return item;
		return item.menu_children?.find((child: any) => child.path === subPath);
	});
	dialog.ruleForm.parent_menu = found?.id ?? null;
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	tableData.param.pageNum = val;
	getTableData();
};

// 页面加载时
onMounted(async () => {
	// await getTableData();
	// dialog.menuData = getMenuData(routesList.value);
	try {
		await getTableData();
		dialog.menuData = getMenuData(routesList.value);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error during getTableData:', error);
		ElMessage.error('加载数据失败');
	}
});
</script>

<style scoped lang="scss"></style>

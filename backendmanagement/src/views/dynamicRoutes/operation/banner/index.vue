<template>
	<div class="system-banner-container layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<span class="ml10" style="white-space: nowrap">轮播图名称：</span>
						<el-input
							size="default"
							clearable
							v-model="tableData.search"
							class="ml10"
							placeholder="请输入轮播图名称"
							style="max-width: 180px"
							@clear="getTableData"
						>
						</el-input>
						<span class="ml10" style="white-space: nowrap">轮播图分类：</span>
						<el-select
						      v-model="tableData.typeSearch"
							  size="default"
							  class="ml10"
							  placeholder="请选择轮播图分类"
							  @change="getTableData"
							  style="width: 180px"
							  clearable
						    >
						      <el-option
						        v-for="item in dialog.typeOptions"
						        :key="item"
						        :label="item"
						        :value="item"
						      />
						</el-select>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询 </el-button>
						<el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<el-table-column prop="id" show-overflow-tooltip label="序号" width="60" />
				<el-table-column prop="idx" label="排序" width="60" />
				<el-table-column prop="name" label="轮播图名称" />
				<el-table-column prop="type" label="轮播图分类" />
				<el-table-column prop="order_title" label="订单批次" />
				<el-table-column v-slot="scope" prop="img" label="内容" >
					<div v-if="scope.row.resource_type === '图片'">
						<el-image
							style="width: 80px; height: 80px; border-radius: 5%"
							:src="scope.row.img?.url"
							fit="cover"
							:preview-src-list="[scope.row.img?.url]"
							preview-teleported
							v-if="scope.row.img?.url"
						/>
						<div v-else>-</div>
					</div>
					<div v-else-if="scope.row.resource_type === '视频'">
						<el-image
							style="width: 80px; height: 80px; border-radius: 5%"
							:src="scope.row.video?.url"
							fit="cover"
							:preview-src-list="[scope.row.video?.url]"
							preview-teleported
							v-if="scope.row.video?.url"
						/>
						<div v-else>-</div>
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column v-slot="scope" prop="exp_time" label="截止日期时间" >
					{{ scope.row.exp_time ? new Date(scope.row.exp_time).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="status" label="状态">
					<el-switch
					    v-model="scope.row.status"
						active-value="启用"
						inactive-value="禁用"
					    active-text="启用"
					    inactive-text="禁用"
						inline-prompt
						@change="handleSwitch(scope.row)"
					  />
				</el-table-column>
				<el-table-column label="操作" fixed="right">
					<template #default="scope">
						<div class="buttonAggregate">
							<el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-pagination
					v-if="tableData.data.length > 0"
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					:pager-count="5"
					:page-sizes="[10, 30, 50]"
					v-model:current-page="tableData.param.pageNum"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total"
				>
				</el-pagination>
			</template>
		</el-card>
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="50vw">
			<el-form ref="bannerFormRef" :model="dialog.ruleForm" :rules="dialog.rules" size="default" label-width="100" >
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="轮播图名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="轮播图分类" prop="type">
							<el-select
							      v-model="dialog.ruleForm.type"
							      placeholder="请选择轮播图分类"
							      style="width: 240px"
							    >
							      <el-option
							        v-for="item in dialog.typeOptions"
							        :key="item"
							        :label="item"
							        :value="item"
							      />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序" prop="idx">
							<el-input-number v-model="dialog.ruleForm.idx" label="请输入排序"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态" prop="status">
							<el-switch
							    v-model="dialog.ruleForm.status"
							    class="mb-2"
								active-value="启用"
								inactive-value="禁用"
							    active-text="启用"
							    inactive-text="禁用"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="链接" prop="path">
							<el-input v-model="dialog.ruleForm.path" type="text" placeholder="请输入跳转路径或链接" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="订单批次" prop="order_title">
							<el-input v-model="dialog.ruleForm.order_title" type="text" placeholder="请输入订单批次" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="截止日期时间" prop="exp_time">
							<el-date-picker
								v-model="dialog.ruleForm.exp_time"
								type="datetime"
								placeholder="请选择截止日期时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="资源类型" prop="resource_type">
							<el-radio-group v-model="dialog.ruleForm.resource_type" @change="handleRadio">
							      <el-radio value="图片" >图片</el-radio>
							      <el-radio value="视频" >视频</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="图片" prop="img" v-if="dialog.ruleForm.resource_type === '图片'">
							<el-upload v-model:file-list="dialog.imageList" ref="upimage" action="#" :limit="1"
								:auto-upload="true" list-type="picture-card" :http-request="beforeLicenseHandle"
								:before-upload="async (file: any) => await beforeImageUpload(file, dialog, 'img_id')"
								:on-remove="() => dialog.ruleForm.img_id = null"
								:on-preview="handlePictureCardPreview"
								:on-exceed="(file: any) => handleExceed(upimage, file, 'image', dialog, 'img_id')"
								:accept="ImgType.join(',')" style="width: 100%;">
								<el-icon class="uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
						</el-form-item>
						<el-form-item label="视频" prop="video" v-else-if="dialog.ruleForm.resource_type === '视频'">
							<el-upload v-model:file-list="dialog.videoList" ref="upvideo" action="#" :limit="1"
								:auto-upload="true" list-type="picture-card" :http-request="beforeLicenseHandle"
								:before-upload="async (file: any) => await beforeVideoUpload(file, dialog, 'video_id')"
								:on-remove="() => dialog.ruleForm.video_id = null"
								:on-preview="handlePictureCardPreview"
								:on-exceed="(file: any) => handleExceed(upvideo, file, 'video', dialog, 'video_id')"
								:accept="videoType.join(',')" style="width: 100%;">
								<el-icon class="uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
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

<script setup lang="ts" name="banner">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { banner } from '/@/api/index';
import upload from "./upload";
import rules from './rule';
const { beforeLicenseHandle, handleExceed, beforeVideoUpload, beforeImageUpload, beforeFileUpload, fileType, videoType, ImgType } = upload
const bannerFun = banner();

// 定义变量内容
const upimage = ref();
const upvideo = ref();
const bannerFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	title: '',
	rules: rules,
	submitTxt: '',
	ruleForm: <any>{ idx: 1 , resource_type: '图片'},
	imgList: [] as any[],
	videoList: [] as any[],
	imageList: [] as any[],
	typeOptions: ['送评页轮播图', '送评活动', '商城首页轮播图']
});
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const tableData = reactive(<any>{
	loading: false,
	search: '',
	typeSearch: '',
	vip: '',
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	time: '',
});

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
	dialogImageUrl.value = uploadFile.url!
	dialogVisible.value = true
}

const scale2Format = (value: string = '0') => {
	return Number.parseFloat(value).toFixed(2);
};

// 按钮切换状态清空图片或视频
const handleRadio = () => {
	if(dialog.ruleForm.resource_type === '图片') {
		dialog.videoList = [];
		dialog.imageList = [];
		dialog.imgList = [];
		dialog.ruleForm.video_id = null;
	} else if (dialog.ruleForm.resource_type === '视频') {
		dialog.imgList = [];
		dialog.imageList = [];
		dialog.videoList = [];
		dialog.ruleForm.img_id = null;
	}
}

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	const { list, total_size } = await bannerFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			// banner_by: { __enum_keys: { idx: 'asc_nulls_last' } },
			where: {
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				type: tableData.typeSearch ? { _eq: tableData.typeSearch } : {}
			},
		},
		{}
	);
	tableData.data = list;
	tableData.total = total_size;
	tableData.loading = false;
};

//初始化
const openDialogCurdFormRef = (row: any = {}) => {
	if (bannerFormRef.value) bannerFormRef.value.resetFields();
	dialog.imgList = [];
	dialog.imageList = [];
	dialog.videoList = [];
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = { 
		...row,
		resource_type: row.resource_type || '图片',
		img_id: row.img?.id ?? null,
		video_id: row.video?.id ?? null
	};

	// 处理图片回显
	if (row.img?.id) {
		dialog.imageList = [{
			name: row.img.id,
			url: row.img.url
		}];
		dialog.imgList = dialog.imageList;
	}
	
	// 处理视频回显
	if (row.video?.id) {
		dialog.videoList = [{
			name: row.video.id,
			url: row.video.url
		}];
	}

	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!bannerFormRef.value) return;
	bannerFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	// 手动验证
	if (dialog.ruleForm.resource_type === '图片' && !dialog.ruleForm.img_id) {
		ElMessage.error('请上传图片');
		return;
	}
	if (dialog.ruleForm.resource_type === '视频' && !dialog.ruleForm.video_id) {
		ElMessage.error('请上传视频');
		return;
	}

	bannerFormRef.value.validate((valid: any) => {
		if (valid) {
			if (dialog.type === 'add') onAdd(dialog.ruleForm);
			if (dialog.type === 'edit') onUpd(dialog.ruleForm);
		}
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
			const { id: ID, img, video, ..._ins } = ruleForm;
			await bannerFun
				.inc(_ins, {})
				.then(() => {
					ElMessage({
						type: 'success',
						message: '添加成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '添加失败！',
					});
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
	ElMessageBox.confirm('确认修改该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, img, video, ..._set } = ruleForm;
			await bannerFun
				.set(
					ID,
					{
						_set,
					},
					{}
				)
				.then(() => {
					ElMessage({
						type: 'success',
						message: '修改成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '修改失败！',
					});
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

const handleSwitch = async (row: any) => {
	await bannerFun
		.set(
			row.id,
			{
				status: row.status,
			},
			{}
		)
		.then(() => {
			ElMessage({
				type: 'success',
				message: row.status + '成功！',
			});
			getTableData();
		})
		.catch(() => {
			ElMessage({
				type: 'error',
				message: row.status + '失败！',
			});
		})
		.finally(() => {
			onCancel();
	});
}

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await bannerFun.del(row.id, false, {}).then(() => {
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
	getTableData();
});
</script>

<style scoped lang="scss"></style>

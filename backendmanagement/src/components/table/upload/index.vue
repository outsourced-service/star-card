<template>
	<div>
		<!-- 图片上传 -->
		<el-upload
			v-if="mode === 'image'"
			v-model:file-list="dialog.fileList"
			ref="upimage"
			action="#"
			:limit="1"
			:auto-upload="true"
			list-type="picture-card"
			:http-request="beforeLicenseHandle"
			:before-upload="async (file: any) => await beforeImageUpload(file, dialog)"
			:on-remove="() => (dialog.ruleForm.img_id = null)"
			:on-preview="handlePictureCardPreview"
			:on-exceed="(file: any) => handleExceed(upimage, file, 'image', dialog)"
			:accept="ImgType.join(',')"
			style="width: 100%"
		>
			<el-icon class="avatar-uploader-icon">
				<Plus />
			</el-icon>
		</el-upload>
		<!-- 文件上传 -->
		<el-upload
			v-if="mode === 'file'"
			v-model:file-list="dialog.fileList"
			ref="upfile"
			action="#"
			:limit="1"
			:http-request="beforeLicenseHandle"
			:auto-upload="true"
			:on-remove="() => (dialog.ruleForm.file_id = null)"
			:before-upload="async (file: any) => await beforeFileUpload(file, dialog)"
			:on-exceed="(file: any) => handleExceed(upfile, file, 'file', dialog)"
			:accept="fileType.join(',')"
			style="width: 100%"
		>
			<!--:on-progress="progressUpload"  -->
			<el-button type="primary">上传文件</el-button>
			<template #tip>
				<div class="el-upload__tip">建议上传pdf文件.</div>
			</template>
		</el-upload>
		<!-- 视频上传 -->
		<el-upload
			v-if="mode === 'video'"
			v-model:file-list="dialog.fileList"
			ref="upvideo"
			action="#"
			:limit="1"
			:http-request="beforeLicenseHandle"
			:auto-upload="true"
			:on-remove="() => (dialog.ruleForm.video_id = null)"
			:before-upload="async (file: any) => await beforeVideoUpload(file, dialog)"
			:on-exceed="(file: any) => handleExceed(upvideo, file, 'video', dialog)"
			:accept="videoType.join(',')"
			style="width: 100%"
		>
			<!--:on-progress="progressUpload"  -->
			<el-button type="primary">上传视频</el-button>
			<template #tip>
				<div class="el-upload__tip">建议上传60MB以下得视频.</div>
			</template>
			<template #file="{ file }">
				<video :src="dialog.dialogImageUrl" width="100%" height="100%" class="videoshow" id="upvideo" controls></video>
			</template>
		</el-upload>
		<!-- 全屏图片 -->
		<el-dialog v-model="dialogVisible" width="fit-content">
			<img w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>
	</div>
</template>
<script setup lang="ts" name="upload">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import upload from './upload';
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
const { beforeLicenseHandle, handleExceed, beforeVideoUpload, beforeImageUpload, beforeFileUpload, fileType, videoType, ImgType } = upload;

//定义接收参数
const props = defineProps({
    //传入文件列表
    modelValue: {
		type: [Object],
		required: true,
	},
	mode: {
		type: String,
		required: true, // 如果需要，可以设置为 true 来要求必须传入 mode
		validator: (value: string) => {
			// 验证 value 是否是 ["video", "image", "file"] 中的一个
			return ['video', 'image', 'file'].includes(value);
		},
	},
});

//订阅全屏时需要的变量
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const upvideo = ref();
const upimage = ref();
const upfile = ref();

const value = reactive()


</script>

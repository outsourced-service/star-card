<template>
    <div>
        <el-upload ref="uploadRef" v-model:file-list="fileList" :accept="accept[mode].join(',')"
            :on-exceed="handleExceed" :on-change="handleChange" :on-preview="handlePreview" :limit="limit"
            :on-remove="handleRemove"
            :http-request="httpRequest" :list-type="mode === 'image' ? 'picture-card' : 'text'" :multiple="multiple"
            :auto-upload="autoUpload">

            <el-icon v-if="mode === 'image'" class="avatar-uploader-icon">
                <Plus />
            </el-icon>

            <el-button v-if="mode === 'file'" type="primary">上传文件</el-button>
            <el-button v-if="mode === 'video'" type="primary">上传视频</el-button>
            <template #tip>
                <div v-if="mode === 'file'" class="el-upload__tip">建议上传pdf文件.</div>
                <div v-if="mode === 'video'" class="el-upload__tip">建议上传60MB以下得视频.</div>
            </template>

        </el-upload>
        <el-dialog v-model="dialogVisible" width="fit-content">
            <template v-if="mode === 'image'">
                <el-image :src="previewSrcList" :preview-src-list="[previewSrcList]" fit="contain" />
            </template>
            <template v-else-if="mode === 'video'">
                <video controls :src="previewSrcList" style="width: 100%;"></video>
            </template>
            <template v-else>
                <iframe :src="previewSrcList" width="100%" height="100%"></iframe>
                <!-- <div>无法预览该文件类型</div> -->
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus';
import type { UploadFile, UploadRawFile, UploadRequestOptions, UploadStatus } from 'element-plus'
import ezInstance from '/@/utils/ezInstance';

const emit = defineEmits(['update:modelValue']);
const accept = ref({
    image: ['image/png', 'image/x-png', 'image/jpeg', 'image/jpg', 'image/pjpeg'],
    file: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar'],
    video: ['.mp3', 'audio/mpeg', '.mp4', 'video/mp4'],
});

const props = defineProps({
    // 模式，字符串类型，必填，验证器确保值为'image', 'file', 'video'之一
    mode: {
        default: 'image',
        type: String as () => 'image' | 'file' | 'video',
        required: true,
        validator: (value: string) => {
            return ['image', 'file', 'video'].includes(value);
        }
    },
    // 模型值，数组类型，必填，验证器确保值为'image', 'file', 'video'之一
    modelValue: {
        type: Array,
        default: () => ([]),
    },
    limit: {
        type: Number,
        default: 1,
    },
    multiple: {
        type: Boolean,
        default: true,
    },
    autoUpload: {
        type: Boolean,
        default: true,
    }
});

const fileList = ref([]);
const uploadRef = ref()
const dialogVisible = ref(false);
const previewSrcList = ref('');

const uploadAPI = {
    image: ezInstance.uploadImage,
    file: ezInstance.uploadFile,
    video: ezInstance.uploadVideo,
}

// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newValue: any) => {
    fileList.value = newValue;
}, { immediate: true });

const handleChange = (file: any, fileList: any) => {
    emit('update:modelValue', fileList);
};

const handleRemove = (file: UploadFile) => {
    const index = fileList.value.findIndex((item: UploadFile) => item.uid === file.uid);
    if (index > -1) {
        fileList.value.splice(index, 1);
        emit('update:modelValue', fileList.value);
    }
}

const handlePreview = (file: any) => {
    previewSrcList.value = file.url || URL.createObjectURL(file.raw);
    dialogVisible.value = true;
};

// 处理文件超出限制
const handleExceed = (files: UploadRawFile[]) => {
    uploadRef.value!.clearFiles()// 清空当前文件列表
    files.forEach((file: UploadRawFile) => {
        file.uid = genFileId() // 生成新的唯一标识
        uploadRef.value!.handleStart(file) // 重新添加文件
    })
    if (props.autoUpload) uploadRef.value!.submit()// 上传添加的图片
}

const httpRequest = async (options: UploadRequestOptions) => {
    const { onSuccess, onError } = options
    const file: any = options.file;
    const onProgress: any = options.onProgress;
    await uploadAPI[props.mode](file, {
        onProgress: (loaded: number, total: number) => {
            const percent: number = Math.floor((loaded / total) * 100);
            onProgress({ percent }); // 激活自带的进度条
        }
    }).then((res: any) => {
        onSuccess(res); // 上传成功回调
        file.response = res
        const { imageId, fileId, videoId } = res
        if (imageId) file.imageId = imageId
        if (fileId) file.fileId = fileId
        if (videoId) file.videoId = videoId
    }).catch((error) => {
        onError(error); // 上传失败回调
    });
}

// 暴露变量
defineExpose({
    submit: (file: UploadFile) => uploadRef.value!.submit(file),
    abort: () => uploadRef.value!.abort(),
    clearFiles: (status?: UploadStatus[]) => uploadRef.value!.clearFiles(status),
    handleStart: (rawFile: UploadRawFile) => uploadRef.value!.handleStart(rawFile),
    handleRemove: (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => uploadRef.value!.handleRemove(file, rawFile),
});

</script>

<style scoped>
.upload-container {
    padding: 20px;
}

.upload-demo {
    margin-bottom: 20px;
}
</style>
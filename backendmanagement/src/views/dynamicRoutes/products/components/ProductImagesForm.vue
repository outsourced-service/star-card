<template>
  <el-form class="productImages-info-form" :model="form" ref="formRef">
    <el-row :gutter="20" style="width: 100%; min-width: 375px;">
      <el-col v-for="(image, index) in form.images" :key="index" :xs="24" :sm="12" :md="8" class="mb20">
        <el-card shadow="hover">
          <el-row :gutter="20">
            <el-col :span="24" class="mb4">
              <el-form-item :label="`排序: ${index + 1}`" prop="type" style="display: flex !important;">
              </el-form-item>
            </el-col>
            <el-col :span="24" class="mb4">
              <el-form-item label="类型" prop="type">
                <el-select v-model="image.type" placeholder="请选择类型">
                  <el-option label="详情图" value="详情图" />
                  <el-option label="轮播图" value="轮播图" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="mb4">
              <el-form-item label="图片" prop="img">
                <uploadMedia v-model="image.img" mode="image" />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="mb4 " style="display: flex; justify-content: center">
              <el-button type="danger" icon="Delete" circle @click="removeImage(index)" />
              <el-button type="success" icon="Plus" circle @click="addImageAfter(index)" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineAsyncComponent } from 'vue';
import { ElMessage } from 'element-plus';

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [Array, Object],
    required: true,
  },
});

// 直接使用传入的 modelValue 作为表单数据
const form = ref({
  images: Array.isArray(props.modelValue) && props.modelValue.length > 0 ? props.modelValue : [{ type: '', img: [] }] as any[],
});

// 删除图片
const removeImage = (index: number) => {
  if (form.value.images.length > 1) {
    form.value.images.splice(index, 1);
    ElMessage.success('图片已删除');
  } else {
    ElMessage.warning('至少保留一张图片');
  }
};

// 在指定索引后添加图片
const addImageAfter = (index: number) => {
  form.value.images.splice(index + 1, 0, { type: '', img: [] });
};

// 监听 form 的变化，更新 modelValue
watch(form, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>

<style lang="scss"></style>
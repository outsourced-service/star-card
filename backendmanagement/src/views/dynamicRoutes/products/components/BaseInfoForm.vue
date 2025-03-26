<template>
  <el-form class="base-info-form" :model="baseForm" :rules="rules" ref="formRef" label-position="left"
    label-width="auto">

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="baseForm.goods_name" placeholder="请输入商品名称" clearable type="textarea" :rows="1" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="开始销售时间" prop="start_sale_time">
          <el-date-picker v-model="baseForm.start_sale_time" type="datetime" placeholder="选择开始销售时间"
            style="width: 100%" />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="排序" prop="idx">
          <el-input v-model="baseForm.idx" type="number" placeholder="请输入排序" clearable />
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="显示销量" prop="show_sales">
          <el-input v-model="baseForm.show_sales" type="number" placeholder="请输入显示总销量" clearable />
        </el-form-item>
      </el-col>


      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="商品分类" prop="category_category">
          <el-select v-model="baseForm.category_category" filterable remote remote-show-suffix reserve-keyword
            placeholder="请选择商品分类" :remote-method="(query = '') => getOption('categories', query)"
            :loading="categories?.loading" size="default" clearable @clear="getOption('categories', '', true)">
            <el-option v-for="cat in categories?.list ?? []" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <el-form-item label="状态" prop="status">
          <el-select v-model="baseForm.status" placeholder="请选择状态">
            <el-option label="已下架" value="已下架" />
            <el-option label="展示中" value="展示中" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
        <el-form-item label="商品标签" prop="goods_tags">
          <el-select v-model="baseForm.goods_tags" filterable remote remote-show-suffix reserve-keyword multiple
            placeholder="请选择商品标签" :remote-method="(query = '') => getOption('tags', query)" :loading="tags?.loading"
            size="default" clearable @clear="getOption('tags', '', true)">
            <el-option v-for="tag in tags?.list ?? []" :key="tag.id" :label="tag.name" :value="tag.id" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <el-form-item label="商品封面" prop="goods_img">
          <uploadMedia v-model="baseForm.goods_img" mode="image" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineAsyncComponent, onMounted, watch } from 'vue';
import shoppingMall from '/@/api/shoppingMall';

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

// 获取相关接口
const categoryAPI = shoppingMall.category();
const tagsAPI = shoppingMall.tags();

const formRef = ref();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      goods_name: '',
      goods_img: [],
      idx: 0,
      show_sales: 0,
      start_sale_time: '',
      category_category: '',
      status: '',
      goods_tags: []
    })
  }
})

const baseForm = ref({...props.modelValue});

// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newValue: any) => {
  baseForm.value = newValue;
}, { immediate: true });


const rules = ref({
  goods_name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '商品名称长度在 2 到 50 个字符之间', trigger: 'blur' }
  ],
  goods_img: [
    { required: true, message: '请上传商品缩略图', trigger: 'blur' }
  ],
  idx: [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
  show_sales: [
    { required: true, message: '请输入显示总销量', trigger: 'blur' },
  ],
  start_sale_time: [
    { required: true, message: '请选择开始销售时间', trigger: 'change' }
  ],
  category_category: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ],
  goods_tags: [
    { type: 'array', required: true, message: '请选择商品标签', trigger: 'change' }
  ]
});

// 获取商品分类
const defaultObj = {
  list: <any>[],
  loading: false,
  total: 0,
  page: 1,
  pageSize: 10,
}
const categories = ref({ ...defaultObj });
const tags = ref({ ...defaultObj });

const getOption = async (type: string, query: string, clear = false) => {
  const ref = type === 'categories' ? categories : tags;
  // 如果已经有数据了，但没有进行搜索，就不需要再获取了
  if (ref.value.list.length > 0 && !query && !clear) return;
  ref.value.loading = true;
  const response = await (type === 'categories' ? categoryAPI.get : tagsAPI.get)({
    page_index: ref.value.page,
    page_size: ref.value.pageSize,
    where: {
      name: query ? { _ilike: `%${query}%` } : {},
    },
    order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
  });
  ref.value.list = response.list;
  ref.value.total = response.total_size;
  ref.value.loading = false;
}

// 初次加载时获取分类和标签
onMounted(async () => {
  await getOption('categories', '');
  await getOption('tags', '');
});


// 暴露变量
defineExpose({
  validate: (callback: any) => formRef.value!.validate(callback),
  resetFields: () => formRef.value!.resetFields(),
  clearValidate: () => formRef.value!.clearValidate(),
});


</script>

<style lang="scss">
.base-info-form {
  .el-col {
    margin-bottom: 16px;
  }
}
</style>
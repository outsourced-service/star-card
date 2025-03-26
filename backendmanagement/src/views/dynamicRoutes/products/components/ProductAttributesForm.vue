<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="商品属性" prop="attributes">
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  form: Object,
  rules: Object,
});
</script> 
<template>
    <div class="system-user-dialog-container">
        <el-dialog :title="dialog.title" class="dialog-p0" v-model="dialog.isShowDialog" width="fit-content">
            <el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" label-width="90px" :rules="dialog.rules">
                <el-row v-if="isAddOrEdit" :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="dialog.ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="角色描述" prop="describe">
                            <el-input v-model="dialog.ruleForm.describe" type="textarea" placeholder="请输入角色描述"
                                maxlength="150"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-transfer v-if="dialog.type === 'configPer'" class="flex align-center" :data="dialog.auths"
                    :titles="['未授权', '已授权']" filter-placeholder="请输入权限名称" filterable
                    v-model="dialog.ruleForm.per_pk_list" :props="{
                        key: 'id',
                        label: 'name',
                    }">
                    <template #left-empty>
                        <el-empty :image-size="60" description="No data" />
                    </template>
                    <template #right-empty>
                        <el-empty :image-size="60" description="No data" />
                    </template>
                    <template #default="{ option }">
                        <el-tooltip class="item" effect="dark" :disabled="!Boolean(option.describe)"
                            :content="option.describe" placement="left-start">
                            <span>{{ option.name }}</span>
                        </el-tooltip>
                    </template>
                </el-transfer>
                <el-tree v-if="dialog.type === 'configMenu'" ref="menuTreeRef" style="min-width: 375px;"
                    :data="dialog.menus" show-checkbox accordion node-key="id" @check="handleCheckChange"
                    :default-checked-keys="dialog.ruleForm.menu_pk_list" :props="{
                        children: 'children_menu',
                        label: 'name',
                    }" />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog" size="default">取 消</el-button>
                    <el-button type="primary" @click="onSubmit" size="default">{{ dialog.submitTxt }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref, computed, nextTick } from 'vue';
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus';
import { mprApi } from '/@/api/system/index';
const RoleApi = mprApi('role');
const PermissionApi = mprApi('per');
const useMenu = mprApi('menu');
// 引入组件


// 定义计算函数
const isAddOrEdit = computed(() => {
    return dialog.type === 'add' || dialog.type === 'edit';
});

// 定义相应回调
const emit = defineEmits(['refresh']);

// 定义变量内容
const curdFormRef = ref<FormInstance>();
const menuTreeRef = ref();
const dialog = reactive({
    isShowDialog: false,
    row: <any>{},
    loading: <any>{}, // 加载状态
    type: '',
    title: '',
    submitTxt: '',
    ruleForm: <any>{
        auths: []
    },
    rules: {
        name: { required: true, message: '请输入角色名称', trigger: 'blur' },
        describe: { required: false, message: '请输入角色描述', trigger: 'blur' }
    },
    auths: [],
    menus: [],
});
// 打开弹窗,初始化
const openDialog = (row: any, operation: 'add' | 'edit' | 'configPer' | 'configMenu') => {
    dialog.row = row;
    const { id, name, describe, per, menu } = row;
    dialog.isShowDialog = true;
    dialog.ruleForm = {
        name: name,
        describe: describe,
        role_pk: id
    };
    if (operation === 'add') {
        dialog.type = 'add';
        dialog.title = '新增角色';
        dialog.submitTxt = '新增';
    } else if (operation === 'edit') {
        dialog.type = 'edit';
        dialog.title = '编辑角色';
        dialog.submitTxt = '修改';
    } else if (operation === 'configPer') {
		formatMenuData(menu)
		dialog.ruleForm = {
		    name: name,
		    describe: describe,
		    role_pk: id,
		    menu_pk_list: formatMenuData(menu),
		    per_pk_list: per.map((item: any) => item.id)
		};
        dialog.type = 'configPer';
        dialog.title = '权限配置';
        dialog.submitTxt = '确认';
		
        onGetAllAuth();
    } else if (operation === 'configMenu') {
		
		formatMenuData(menu)
		dialog.ruleForm = {
		    name: name,
		    describe: describe,
		    role_pk: id,
		    menu_pk_list: formatMenuData(menu),
		    per_pk_list: per.map((item: any) => item.id)
		};
        nextTick(() => {
            menuTreeRef.value.setCheckedKeys(dialog.ruleForm.menu_pk_list);
        })
        dialog.type = 'configMenu';
        dialog.title = '菜单配置';
        dialog.submitTxt = '确认';
        onGetAllMenu()
    }

};

// 格式化菜单数据
const formatMenuData = (menuList: any) => {
    const menuMap: { [x: string]: any; } = {};
    const formattedMenu: any[] = [];
    // 创建一个映射，方便查找父节点
    menuList.forEach((menu: { id: string | number; }) => {
        menuMap[menu.id] = { ...menu, children: [] }; // 初始化每个菜单项
    });
    // 构建树形结构
    menuList.forEach((menu: { parent_menu: string | number; id: string | number; }) => {
        if (menu.parent_menu) {
            // 如果有父节点，将当前菜单项添加到父节点的 children 数组中
            menuMap[menu.parent_menu]?.children.push(menuMap[menu.id]);
        } else {
            // 如果没有父节点，直接添加到根数组
            formattedMenu.push(menuMap[menu.id]);
        }
    });
    return Object.keys(menuMap).filter(key => !menuMap[key].children.length);
};

// 关闭弹窗
const closeDialog = () => {
    dialog.isShowDialog = false;
    if (!curdFormRef.value) return;
    curdFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
    if (!curdFormRef.value) return;
    curdFormRef.value.validate((valid: any) => {
        if (valid) {
            if (dialog.type === 'add') onAdd(dialog.ruleForm);
            if (dialog.type === 'edit') onUpd(dialog.ruleForm);
            if (['configPer', 'configMenu'].includes(dialog.type)) onAddAuthAndMenu(dialog.ruleForm);
        }
    });
};

// 新增
const onAdd = (ruleForm: any) => {
	console.log(ruleForm)
    ElMessageBox.confirm('确认新增该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { id: ID, ..._ins } = ruleForm;
        await RoleApi.inc({
            name: _ins.name,
            describe: _ins.describe,
			is_active: true
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '添加成功！',
            });
            emit('refresh');
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '添加失败！',
            });
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

// 修改
const onUpd = (ruleForm: any) => {
    ElMessageBox.confirm('确认修改该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            const { role_pk: ID, ..._set } = ruleForm;
            await RoleApi.set(ID, {
                name: _set.name,
                describe: _set.describe,
            }).then(() => {
                ElMessage({
                    type: 'success',
                    message: '修改成功！',
                });
                emit('refresh');
            }).catch(() => {
                ElMessage({
                    type: 'error',
                    message: '修改失败！',
                });
            }).finally(() => {
                closeDialog();
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消修改',
            });
        });
};

// 配置
//添加权限和菜单
const onAddAuthAndMenu = (ruleForm: any) => {
    ElMessageBox.confirm('确认添加权限和菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { id: ID, checkedKeys, halfCheckedKeys, ..._set } = ruleForm;
        const requestData = {
            role_pk: ruleForm.role_pk,
            ...(dialog.type === 'configPer' ? { per_pk_list: ruleForm.per_pk_list } : { menu_pk_list: [...checkedKeys, ...halfCheckedKeys] })
        };
        await RoleApi.setMenuAndPermissions(requestData).then(() => {
            ElMessage({
                type: 'success',
                message: `${dialog.type === 'configPer' ? '权限' : '菜单'}添加成功！`,
            });
            emit('refresh');
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: `${dialog.type === 'configPer' ? '权限' : '菜单'}添加失败！`,
            });
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

// 查询所有权限
const onGetAllAuth = () => {
    if (!dialog.auths?.length) PermissionApi.get({
        where: {
            is_active: { _eq: true }
        }
    }).then((res: { list: never[]; }) => {
        dialog.auths = res.list;
    });
};

// 查询所有菜单
const onGetAllMenu = () => {
	const search = ''
    if (!dialog.menus?.length) useMenu.get({
		order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
		where: {
			name: {
				_ilike: `%${search}%`
			}
		},
	}).then((res: { list: never[]; }) => {
        // dialog.menus = res.list;
		if (res.list && Array.isArray(res.list)) {
			dialog.menus = res.list;
		} else {
			dialog.menus = [];
		}
		console.log(dialog.menus)
    });
};

const handleCheckChange = (data: any, { checkedKeys, halfCheckedKeys }: { checkedKeys: any[], halfCheckedKeys: any[] }) => {
    // 将选中的节点 ID 保存到 dialog.ruleForm.menu_pk_list 中
    dialog.ruleForm.checkedKeys = checkedKeys;
    dialog.ruleForm.halfCheckedKeys = halfCheckedKeys;
};

// 暴露变量
defineExpose({
    openDialog,
});
</script>

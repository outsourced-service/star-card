import { reactive } from 'vue';
import { updateCurrentUserInfo } from '@/api/user/user';

// 定义用户角色枚举
enum UserRole {
    PERSONAL = 'personal', // 个人用户
    BUSINESS = 'business'  // 商家
}

// 定义用户信息表单的类型
interface UserFormData {
    nickname?: string;           // 昵称
    avatar?: {                  // 用户头像
        id: number;
        url: string;
    };
    profile?: string;           // 个人简介
    role?: UserRole;           // 用户角色
    background_image?: {       // 背景图
        id: number;
        url: string;
    };
    province?: string;         // 所在省份
    city?: string;            // 所在城市
    area?: string;            // 所在地区
    location?: {              // 中心地理位置
        latitude: number;
        longitude: number;
    };
    address_detail?: string;   // 账号详细地址，线下门店地址
    address_title?: string;    // 地址简要信息
    address_info?: string;     // 地图详细信息
    house?: string;           // 门牌号
    start_business_hours?: string; // 营业时间开始
    exp_business_hours?: string;   // 营业时间结束
    edit_time?: string;        // 卡片最新更新时间
    login_time?: string;       // 用户最新登录时间
}

// 创建全局表单状态管理
class FormStore {
    // 用户信息表单数据
    private userForm = reactive({} as UserFormData);
    
    // 表单是否被修改
    private isModified = reactive({ user: false } as { user: boolean });
    
    // 获取用户表单数据
    getUserForm() {
        return this.userForm;
    }
    
    // 设置用户表单数据
    setUserForm(data: Partial<UserFormData>) {
        Object.assign(this.userForm, data);
        this.isModified.user = true;
    }
    
    // 更新单个字段
    updateUserField<K extends keyof UserFormData>(field: K, value: UserFormData[K]) {
        this.userForm[field] = value;
        this.isModified.user = true;
    }
    
    // 重置用户表单
    resetUserForm() {
        Object.keys(this.userForm).forEach(key => {
            delete this.userForm[key as keyof UserFormData];
        });
        this.isModified.user = false;
    }
    
    // 检查表单是否被修改
    isFormModified(formType: 'user') {
        return this.isModified[formType];
    }
    
    // 提交用户表单
    async submitUserForm() {
        if (!this.isModified.user) {
            return null;
        }
        
        try {
            // 过滤掉空值
            const formData = Object.entries(this.userForm).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, any>);
            
            // 提交表单
            const result = await updateCurrentUserInfo(formData);
            
            // 重置表单状态
            if (result) {
                this.resetUserForm();
            }
            
            return result;
        } catch (error) {
            console.error('提交用户表单失败:', error);
            throw error;
        }
    }
    
    // 验证用户表单
    validateUserForm() {
        const errors: Partial<Record<keyof UserFormData, string>> = {};
        
        // 验证昵称
        if (this.userForm.nickname && this.userForm.nickname.length > 20) {
            errors.nickname = '昵称不能超过20个字符';
        }
        
        // 验证简介
        if (this.userForm.profile && this.userForm.profile.length > 200) {
            errors.profile = '简介不能超过200个字符';
        }
        
        // 验证地址详情
        if (this.userForm.address_detail && this.userForm.address_detail.length > 100) {
            errors.address_detail = '地址详情不能超过100个字符';
        }
        
        // 验证门牌号
        if (this.userForm.house && this.userForm.house.length > 50) {
            errors.house = '门牌号不能超过50个字符';
        }
        
        // 验证营业时间
        if (this.userForm.start_business_hours && this.userForm.exp_business_hours) {
            const start = new Date(`2000/01/01 ${this.userForm.start_business_hours}`);
            const end = new Date(`2000/01/01 ${this.userForm.exp_business_hours}`);
            if (start >= end) {
                errors.start_business_hours = '营业开始时间必须早于结束时间';
                errors.exp_business_hours = '营业结束时间必须晚于开始时间';
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// 创建全局单例
export const formStore = new FormStore();

// 使用示例：
/*
// 设置表单数据
formStore.setUserForm({
    nickname: '新昵称',
    introduce: '这是我的简介'
});

// 更新单个字段
formStore.updateUserField('nickname', '新昵称');

// 提交表单
try {
    await formStore.submitUserForm();
    uni.showToast({ title: '保存成功' });
} catch (error) {
    uni.showToast({ title: '保存失败', icon: 'error' });
}

// 验证表单
const { isValid, errors } = formStore.validateUserForm();
if (!isValid) {
    console.log('表单验证错误:', errors);
}
*/ 
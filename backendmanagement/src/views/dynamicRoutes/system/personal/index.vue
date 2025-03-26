
<template>
	<div class="personal layout-pd">
		<el-card shadow="hover" style="width: 100%; height: calc(100vh - 120px); border-radius: 20px;">
			<div class="personal-item">
				<div class="personal-item-top">
					<div class="personal-title">
						<div class="personal-title-divider"></div>
						<div class="personal-title-text">信息管理</div>
					</div>
					<div class="personal-user">
						<div class="personal-user-item">
							<div class="user-item-title">头像</div>
							<div v-if="!is_update" class="user-image">
								<el-image style="width: 125px; height: 125px; border-radius: 6px;" :src="userInfos.photo" fit="contain"
									:preview-src-list="[userInfos.photo]" preview-teleported />
							</div>
							<div v-else class="user-image">
								<el-upload v-model:file-list="state.fileListAvatar" action="#" accept="image/*"
									:http-request="beforeLicenseHandle" list-type="picture-card"
									:on-success="handleImgSuccess" :limit="1"
									style="width: 125px; height: 125px;">
									<div class="tip_all_img">+</div>
								</el-upload>
							</div>
						</div>
						<div class="personal-user-item">
							<div class="user-item-title">昵称</div>
							<div v-if="!is_update" class="user-item">{{ userInfos.username }}</div>
							<div v-else class="user-item">
								<el-input v-model="state.personalForm.nickname" placeholder="请输入昵称"
								clearable></el-input>
							</div>
						</div>
						<div class="personal-user-item">
							<div class="user-item-title">手机号</div>
							<div v-if="!is_update" class="user-item">{{ userInfos.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3') }}</div>
							<div v-else class="user-item">
								<el-input v-model="state.personalForm.phone" placeholder="请输入手机"
									clearable></el-input>
							</div>
							
						</div>
						<div class="personal-user-item">
							<div class="user-item-title">登录密码</div>
							<div v-if="!is_update" class="user-item"></div>
							<div v-else class="user-item">
								<el-input v-model="state.personalForm.phone" placeholder="请输入手机"
									clearable></el-input>
							</div>
						</div>
					</div>
				</div>
				<div class="personal-button">
					<div class="button">
						<el-button v-if="!is_update" @click="handleUpdate" color="#FD7A38" :dark="isDark" plain style="border-radius: 10px; width: 88px; height: 45px;">编辑</el-button>
						<el-button v-else @click="updatePersonal" color="#FD7A38" :dark="isDark" plain style="border-radius: 10px; width: 88px; height: 45px;">提交</el-button>
					</div>
					<div class="button">
						<el-button plain style="border-radius: 10px; width: 88px; height: 45px;">取消</el-button>
					</div>
				</div>
			</div>
		</el-card>
			<!-- 更新信息 -->
			<!-- <el-col :span="24">
				<el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
					<div class="personal-edit-title">基本信息</div>
					<el-form :model="state.personalForm" size="default" label-width="40px" class="mt35 mb35">
						<el-row :gutter="35">
							<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
								<el-form-item label="昵称">
									<el-input v-model="state.personalForm.nickname" placeholder="请输入昵称"
										clearable></el-input>
								</el-form-item>
								<el-form-item label="手机">
									<el-input v-model="state.personalForm.phone" placeholder="请输入手机"
										clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="18" :xl="4" class="mb20">
								<el-form-item label="头像">
									<el-upload v-model:file-list="state.fileListAvatar" action="#" accept="image/*"
										:http-request="beforeLicenseHandle" list-type="picture-card"
										:on-success="handleImgSuccess" :limit="1">
										<div class="tip_all_img">+</div>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
								<el-form-item>
									<el-button type="primary" @click="updatePersonal">
										<el-icon>
											<ele-Position />
										</el-icon>
										更新个人信息
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div class="personal-edit-title mb15">账号安全</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">账户密码</div>
								<div class="personal-edit-safe-item-left-value">建议定期更改密码以提高安全性</div>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="onChangePwd">立即修改</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</el-col> -->
		<DeptDialog ref="deptDialogRef" @refresh="setPwd" />
	</div>
</template>

<script setup lang="ts" name="personal">
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { reactive, computed, onMounted, defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '/@/stores/userInfo';
import { formatAxis } from '/@/utils/formatTime';
// import { useUserApi } from '/@/api/system/index';
import { ElMessage, ElMessageBox, UploadProps, UploadRequestOptions } from 'element-plus';
import md5 from 'md5';
// import * as ezcloud from '/@/utils/ezcloudbase.js';
import ezInstance from '/@/utils/ezInstance';// 引入ezcloud工具，用于执行数据操作  
const {api,ezclient} =ezInstance
import { Session } from '/@/utils/storage';

const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);
// const userApi = useUserApi();
const DeptDialog = defineAsyncComponent(() => import('./dialog.vue'));

const deptDialogRef = ref();
// 定义变量内容
const { t } = useI18n();
const state = reactive<PersonalState>({
	fileListAvatar: [],
	personalForm: {
		nickname: '',
		username: '',
		avatar_id: '',
		role: '',
		phone: '',
		login_time: new Date().toLocaleString(),
	},
});

const is_update = ref(false);
const isDark = ref(false);

// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});

//点击编辑按钮
const handleUpdate = () => {
	is_update.value = true;
}

const roles = () => {
	let userInfo = userInfos.value;
	return userInfo.manager_role.map((item: { name: any }) => item.name).join('、');
};
const onChangePwd = () => {
	deptDialogRef.value.openDialog();
};
const beforeLicenseHandle = (param: UploadRequestOptions) => {
	return new Promise((resolve) => {
		const formData = new FormData();
		formData.append('file', param.file);
		resolve(formData);
	});
};
const handleImgSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	// ezclient.local_uimage(uploadFile.raw!).then((res: { imageId: any }) => {
	// 	const { imageId } = res;
	// 	state.personalForm.avatar_id = imageId;
	// });
};
const updatePersonal = async () => {
	// await userApi.userBaseInfo({
	// 	nickname: state.personalForm.nickname,
	// 	phone: state.personalForm.phone,
	// 	manager_pk: userInfos.value.id,
	// 	avatar_id: state.personalForm.avatar_id,
	// });
	// state.personalForm.nickname = '';
	// state.personalForm.phone = '';
	// state.fileListAvatar = [];
	// // 触发初始化用户信息 pinia
	// await useUserInfo().setUserInfos(false, true);
	// ElMessage.success('修改成功');
	is_update.value = false;
};
const setPwd = async (password: any) => {


	ElMessageBox.confirm(`密码修改成功后，将重新登录，是否确认?`, "再次确认", {
		type: 'warning',
		closeOnClickModal: false,
		closeOnPressEscape: false,
		// title: t('message.user.logOutTitle'),
		// message: `确认将密码修改为：“${pwd.password}”，是否继续?`,
		showCancelButton: true,
		confirmButtonText: t('message.user.logOutConfirm'),
		cancelButtonText: t('message.user.logOutCancel'),
		buttonSize: 'default',
	})
		.then(async () => {
			// await userApi.userUpdateAccount({
			// 	username: userInfos.value.username,
			// 	password: md5(password),
			// 	manager_pk: userInfos.value.id,
			// });
			// ElMessage.success('修改成功');
			// // 清除缓存/token等
			// Session.clear();
			// // 使用 reload 时，不需要调用 resetRoute() 重置路由
			// window.location.reload();
		})
		.catch(() => { });
};
onMounted(() => { });
</script>

<style scoped lang="scss">@use '../../../../theme/mixins/index.scss' as mixins;

.personal {
	.personal-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: space-between;
		height: calc(100vh - 200px);
		.personal-button {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
			.button {
				margin: 0 10px;
			}
		}
		.personal-item-top {
			margin-top: 10px;
			.personal-title {
				display: flex;
				align-items: center;
				.personal-title-divider {
					background-color: #FD7A38;
					width: 5px;
					height: 21px;
					opacity: 1;
					border-radius: 3px;
				}
				.personal-title-text {
					margin-left: 8px;
					width: 72px;
					height: 26px;
					opacity: 1;
					/** 文本1 */
					font-size: 18px;
					font-weight: 500;
					letter-spacing: 0px;
					line-height: 25px;
					color: rgba(0, 0, 0, 1);
					text-align: left;
					vertical-align: top;
				}
			}
			.personal-user {
				// margin-top: 30px;
				// height: 130px;
				.personal-user-item {
					display: flex;
					align-items: center;
					margin: 30px 0;
					.user-item-title {
						left: 0px;
						margin-top: 2px;
						width: 86px;
						height: 21px;
						opacity: 1;
						/** 文本1 */
						font-size: 14px;
						font-weight: 400;
						letter-spacing: 0px;
						line-height: 20px;
						color: rgba(101, 103, 109, 1);
						text-align: left;
						vertical-align: top;
			
					}
					.user-item {
						display: flex;
						align-items: center;
						width: 350px;
						height: 45px;
					}
					.user-image {
						height: 130px;
						:deep(.el-upload),
						:deep(.el-upload--picture-card) {
							width: 120px;
							height: 120px;
						}
					}
				}
			}
		}
	}

	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;

			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}

		.personal-info-box {
			height: 130px;
			overflow: hidden;

			.personal-info-ul {
				list-style: none;

				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;

					.personal-info-li-title {
						display: inline-block;
						@include mixins.text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}

					& a:hover {
						color: var(--el-color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}

	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;

				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}

				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}

				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					color: var(--next-color-white);

					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}

	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);

			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--el-color-primary);
			}
		}

		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;

			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;

					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}

					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include mixins.text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}

			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>

import CurdService from "@/utils/ezInstance/curd";
import ezInstance from '@/utils/ezInstance';
import { login } from '@/api/login/index';

const { ezclient } = ezInstance;

// 定义用户表字段 - 只保留必要字段
const userFields = [
  'id',
  'user_id',
  'username',
  'mobile',
  'nickname',
  'avatar',
  'name',
  'sex',
  'birthday',
  'profile',
  'role',
  'is_authentication',
  'is_personal',
  'is_recommend',
  'background_image',
  'score',
  'growth_value',
  'province',
  'city',
  'area',
  'location',
  'address_detail',
  'address_title',
  'address_info',
  'house',
  'start_business_hours',
  'exp_business_hours',
  'edit_time'
];

// 创建用户表的CRUD服务实例
const userService = new CurdService('user', userFields);

/**
 * 获取当前登录用户信息
 * @returns {Promise} 返回用户信息
 */
export const getCurrentUserInfo = async () => {
  try {
    const { userID } = await login();
    const result = await userService.query({ id: userID });
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
};

/**
 * 根据用户ID获取用户信息
 * @param {Number} userId 用户ID
 * @returns {Promise} 返回用户信息
 */
export const getUserInfoById = async (userId: number) => {
  try {
    const result = await userService.query({ id: userId });
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
};

/**
 * 根据用户名获取用户信息
 * @param {String} username 用户名
 * @returns {Promise} 返回用户信息
 */
export const getUserInfoByUsername = async (username: string) => {
  try {
    const result = await userService.query({ username: { _eq: username } });
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
};

/**
 * 更新当前用户信息 - 只能更新本人信息
 * @param {Object} userData 用户数据
 * @returns {Promise} 返回更新结果
 */
export const updateCurrentUserInfo = async (userData: any) => {
  try {
    const { userID } = await login();
    const result = await userService.update({
      id: userID,
      _set: userData
    });
    return result;
  } catch (error) {
    console.error('更新用户信息失败:', error);
    throw error;
  }
};

/**
 * 更新用户头像 - 只能更新本人头像
 * @param {String} avatarUrl 头像URL
 * @returns {Promise} 返回更新结果
 */
export const updateUserAvatar = async (avatarUrl: string) => {
  try {
    const { userID } = await login();
    const result = await userService.update({
      id: userID,
      _set: { avatar: avatarUrl }
    });
    return result;
  } catch (error) {
    console.error('更新用户头像失败:', error);
    throw error;
  }
};

/**
 * 更新用户背景图 - 只能更新本人背景图
 * @param {String} backgroundImageUrl 背景图URL
 * @returns {Promise} 返回更新结果
 */
export const updateUserBackgroundImage = async (backgroundImageUrl: string) => {
  try {
    const { userID } = await login();
    const result = await userService.update({
      id: userID,
      _set: { background_image: backgroundImageUrl }
    });
    return result;
  } catch (error) {
    console.error('更新用户背景图失败:', error);
    throw error;
  }
};

/**
 * 更新用户地理位置信息 - 只能更新本人地理位置
 * @param {Object} locationData 地理位置数据
 * @returns {Promise} 返回更新结果
 */
export const updateUserLocation = async (locationData: any) => {
  try {
    const { userID } = await login();
    const result = await userService.update({
      id: userID,
      _set: {
        province: locationData.province,
        city: locationData.city,
        area: locationData.area,
        location: locationData.location,
        address_detail: locationData.address_detail,
        address_title: locationData.address_title,
        address_info: locationData.address_info,
        house: locationData.house
      }
    });
    return result;
  } catch (error) {
    console.error('更新用户地理位置失败:', error);
    throw error;
  }
};

/**
 * 更新用户营业时间 - 只能更新本人营业时间
 * @param {String} startTime 开始时间
 * @param {String} endTime 结束时间
 * @returns {Promise} 返回更新结果
 */
export const updateUserBusinessHours = async (startTime: string, endTime: string) => {
  try {
    const { userID } = await login();
    const result = await userService.update({
      id: userID,
      _set: {
        start_business_hours: startTime,
        exp_business_hours: endTime
      }
    });
    return result;
  } catch (error) {
    console.error('更新用户营业时间失败:', error);
    throw error;
  }
};

export default {
  getCurrentUserInfo,
  getUserInfoById,
  getUserInfoByUsername,
  updateCurrentUserInfo,
  updateUserAvatar,
  updateUserBackgroundImage,
  updateUserLocation,
  updateUserBusinessHours
}; 
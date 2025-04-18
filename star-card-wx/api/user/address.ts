import CurdService from "@/utils/ezInstance/curd";
import ezInstance from '@/utils/ezInstance';
import { login } from '@/api/login/index';

const { ezclient } = ezInstance;

// 定义地址表字段
const addressFields = [
  'id',
  'user_id',
  'phone',
  'consignee',
  'province',
  'city',
  'area',
  'location',
  'address_title',
  'address_info',
  'address_detail',
  'house',
  'set_default_num',
  'created_at',
  'updated_at'
];

// 创建地址表的CRUD服务实例
const addressService = new CurdService('address', addressFields);

/**
 * 获取当前用户的地址列表
 * @returns {Promise} 返回地址列表
 */
export const getUserAddressList = async () => {
  try {
    const { userID } = await login();
    const result = await addressService.query({
      where: { user_id: { _eq: userID } },
      order_by: { set_default_num: 'desc' }
    });
    return result.data || [];
  } catch (error) {
    console.error('获取地址列表失败:', error);
    return [];
  }
};

/**
 * 获取单个地址详情
 * @param {Number} addressId 地址ID
 * @returns {Promise} 返回地址详情
 */
export const getAddressDetail = async (addressId: number) => {
  try {
    const result = await addressService.query({ id: addressId });
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('获取地址详情失败:', error);
    return null;
  }
};

/**
 * 添加新地址
 * @param {Object} addressData 地址数据
 * @returns {Promise} 返回添加结果
 */
export const addAddress = async (addressData: any) => {
  try {
    const { userID } = await login();
    // 确保地址数据包含用户ID
    const data = {
      ...addressData,
      user_id: userID,
      // 如果没有设置默认值，则设置为0
      set_default_num: addressData.set_default_num || 0
    };
    
    const result = await addressService.insert(data);
    return result;
  } catch (error) {
    console.error('添加地址失败:', error);
    throw error;
  }
};

/**
 * 更新地址信息
 * @param {Number} addressId 地址ID
 * @param {Object} addressData 更新的地址数据
 * @returns {Promise} 返回更新结果
 */
export const updateAddress = async (addressId: number, addressData: any) => {
  try {
    const result = await addressService.update({
      id: addressId,
      _set: addressData
    });
    return result;
  } catch (error) {
    console.error('更新地址失败:', error);
    throw error;
  }
};

/**
 * 删除地址
 * @param {Number} addressId 地址ID
 * @returns {Promise} 返回删除结果
 */
export const deleteAddress = async (addressId: number) => {
  try {
    const result = await addressService.delete({ id: addressId });
    return result;
  } catch (error) {
    console.error('删除地址失败:', error);
    throw error;
  }
};

/**
 * 设置默认地址
 * @param {Number} addressId 地址ID
 * @returns {Promise} 返回设置结果
 */
export const setDefaultAddress = async (addressId: number) => {
  try {
    const { userID } = await login();
    
    // 1. 先将该用户的所有地址的set_default_num设为0
    await ezclient.query({
      name: 'address',
      args: {
        where: { user_id: { _eq: userID } },
        data: { set_default_num: 0 }
      }
    });
    
    // 2. 将指定地址设为默认地址（使用当前时间戳）
    const timestamp = Date.now();
    const result = await addressService.update({
      id: addressId,
      _set: { set_default_num: timestamp }
    });
    return result;
  } catch (error) {
    console.error('设置默认地址失败:', error);
    throw error;
  }
};

export default {
  getUserAddressList,
  getAddressDetail,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};

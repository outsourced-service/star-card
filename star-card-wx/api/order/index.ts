import CurdService from "@/utils/ezInstance/curd";
const order = new CurdService("order", "id");

export default {
    // 获取订单列表
    getOrderList(params: any) {
        return order.query();
    },
}
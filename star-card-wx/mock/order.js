export const order = {
	name: '慢速档 ValueBulk',
	size: '常规尺寸',
	type: '仅评卡品',
	number: 30,
	price: 5000,
	logo_image: 'https://img.picui.cn/free/2025/03/25/67e2129b770b2.png',
	image: 'http://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V8ER6ebzHLzljbxGt9ZKDNFyPbv1XfIPhMzp5g-QPLe7uGBLu6d2eCNQvQHYSpcaMe1XfvFeUavx3sdI0pd7dNpbzfFuDcPu2v08DUPa5v5I3qOpUeu6qw6DQOg3qYQ0RT3sE7hoyQXd6xD~OUNauN~d6m22jVaOOryelXCODKkgC5SOnQ8bmBHIWOJFA~DqA36G67gbCDRh06NDPh8sxExUtxp34JK-AT5zi0igdhVipE74UjSXNi3KTwAJwoSxfJdSFZJZfgYfmnw1G2J79HPz5UmXqBEHDGAKhQmGmC0LEo3oU2w4SSDllJ0RKEISvz0x60J6ZBCftdiJ153kAg__'
}

export const orderList = [
  {
    order: {
      id: 87,
      创建时间: "2024-10-29 19:24:54.734352",
      mode: "送评订单",
      order_info: [
        {
          order_id: 1730704797517,
          pay_amount: 315000,
          total_price: 315000,
          num: 15,
          notes: "快递已签收",
          order_annex: [ // 订单附件（示例）
            { 
              image_key: "project/.../VvXjNKbsVurn9V0g85BrDA==.png",
              type: "鉴定证书" 
            }
          ],
          order_user_annex: [], // 用户附件（示例留空）
          order_info_paydetail: [ // 支付详情（示例）
            {
              payment_method: "支付宝",
              pay_time: "2024-11-01 18:06:26.609",
              amount: 315000
            }
          ]
        }
      ],
      evaluation: [ // 关联评估信息
        {
          id: 1,
          name: "PSA中国团送",
          address: "广东省深圳市南山区...",
          contact: "王先生 18610801301"
        }
      ]
    }
  },
  {
    order: {
      id: 188,
      创建时间: "2025-02-10 16:20:07.399474",
      mode: "已出分订单", 
      order_info: [
        {
          order_id: 1731483732603,
          pay_amount: 105100,
          total_price: 105100,
          num: 5,
          notes: "测试单改成已出分状态",
          order_annex: [
            { 
              image_key: "project/.../wkkgcQUO_8K8e2k-ATUV8w==.png",
              type: "封装照片" 
            }
          ],
          order_info_paydetail: [
            {
              payment_method: "微信支付",
              pay_time: "2025-02-10 16:20:07.399474",
              amount: 105100
            }
          ]
        }
      ],
      evaluation: [
        {
          id: 8,
          name: "魔都兄弟",
          address: "广东省深圳市南山区...",
          contact: "王先生 18610801301"
        }
      ]
    }
  }
]
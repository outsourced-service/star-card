// 将时间戳转换为年月日
export const timestampToDateString = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

// 计算两个时间戳之间的天数差
export const calculateDaysDifference = (timestamp1, timestamp2) => {
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2);
  const difference = date1.getTime() - date2.getTime();
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  return daysDifference;
}
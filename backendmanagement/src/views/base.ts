export const maskPhoneNumber = (phoneNumber: string) => {
  if (!/^\d{11}$/.test(phoneNumber)) {
    // return '电话号码格式不正确';
	return phoneNumber;
  }
  const maskedPhone = [phoneNumber.slice(0, 3), '****', phoneNumber.slice(-4)].join('');
  return maskedPhone;
};
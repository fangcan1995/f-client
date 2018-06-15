export const passwordRegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?_., ]).*$/;  //登录密码
var onlyReg=/^[a-zA-Z0-9!@#$%^&*?_.,]*$/;
var reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?_.,]).*$/;
export const tradePasswordRegExp = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/;  //交易密码
export const phoneRegExp=/^(0|86|17951)?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/;   //手机号正则
export const passRegExp=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/;  //密码正则
export const imgcodeRegExp=/^[A-Za-z0-9]{4,6}$/;  //图形验证码正则
export const smscodeRegExp=/^[0-9]{6}$/;  //手机验证码正则
export const companyNameRegExp = /^(([\u4e00-\u9fff]{2,50})|([a-z\.\s\,]{2,50}))$/i;  //2-50个字，可以包含汉字 英文空格和逗号
export const nameRegExp = /^(([\u4e00-\u9fa5]{2,8})|([a-zA-Z]{2,16}))$/;     //2到8个字的汉字,或者2到16个字的英文
export const realnameRegExp = /(^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,7}$)/;     //2到7个字的汉字
export const inviteCodeRegExp=/^(((0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})|([A-Za-z0-9]{6}))$/i; //邀请码正则，可以为手机号或6位字母与数字组合
export const idcodeRegExp=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号码

export const investAmountExp=/^\+?[1-9][0-9]*$/;  //投资金额

export const amountExp=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/; //金额
export const amountPointExp=/^([1-9][0-9]*)+(.{1})?$/; //金额


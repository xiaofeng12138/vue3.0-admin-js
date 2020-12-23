

// 正则校验手机号
export function validate_Phone(value){
    let regPhone = /^1[3456789]\d{9}$/;
    return regPhone.test(value);
}

// 正则校验密码
export function validate_Password(value){
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPassword.test(value);
}
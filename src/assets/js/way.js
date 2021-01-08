import md5 from 'js-md5'

// 密码加密
export function passwordMd5(password) {
  return md5(password)
}

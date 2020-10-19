/*
    要求:能根据接口文档定义接口请求接口
    包含应用中所有接口请求函数的模块
    接口请求函数
    每个函数返回promise
*/
import ajax from './ajax'

const BASE = ''

// 登录
// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user,'POST')
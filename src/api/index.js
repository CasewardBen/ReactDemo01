/*
    要求:能根据接口文档定义接口请求接口
    包含应用中所有接口请求函数的模块
    接口请求函数
    每个函数返回promise
*/
import ajax from './ajax'
import {message} from 'antd'
import jsonp from 'jsonp'

const BASE = ''

// 登录
// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }

export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user,'POST')

/*
jsonp请求的接口请求函数
*/
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            console.log('jsonp', err, data)
            // 如果成功了
            if( !err && data.status==='success'){
                // 去除需要的数据
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            }else{ // 如果失败了
                message.error('获取天气信息失败')
            }
        })
    })
}
// reqWeather('南京')
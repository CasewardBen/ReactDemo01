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

// 获取分类的列表
export const reqCategory =(parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory =(categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory =({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')


// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE +'/manage/product/list', {pageNum, pageSize})

// 根据商品名称/描述搜索商品分页列表
// searchType:搜索的类型，productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
})

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
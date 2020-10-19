/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是一个promise对象
1.优化：统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不去reject，而是显示错误提示
2.优化2：异步得到的不是response，而是response.data
    在请求成功resovle时，resolve(response.data)
*/

import axios from 'axios'

import {message} from 'antd'

export default function ajax(url, data={}, type='GET'){

    return new Promise((resolve, reject) => {
        let promise
        //1.执行异步ajax请求
        if(type==='GET'){ // 发送get请求
            promise = axios.get(url, { // 配置对象
                params:data // 指定请求参数
            })
        }else { // 发送post请求
            promise =  axios.post(url, data)
        }
        // 2.如果成功，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        }).catch(error => { // 3.如果失败了，不调用reject(reason)，而是提示异常信息
            message.error('请求出错了：', error.message)
        })
    })

    
}

// // 请求登录的接口
// ajax('/login', {username:'Tom', password:'12345'}, 'POST').then()
// // 添加用户
// ajax('/manage/user/add', {
//     username:'Tom',
//     password:'12345',
//     phone:'123456789'
// }, 'POST').then()
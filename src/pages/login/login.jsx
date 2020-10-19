import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
// Icon用法改变了
import './login.less'
import logo from './images/logo.jpg'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

// 登录的路由组件
class Login extends Component{

    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()
        // 对所有的表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            // 校验成功
            if(!err){
                console.log('提交登录的ajax请求：', values)
                // 请求登录
                const {username, password} = values
                // reqLogin(username, password).then(
                //     response => {
                //         console.log('请求成功', response.data)
                //     }
                // ).catch(
                //     error => {
                //         console.log('请求失败', error)
                //     }
                // )
                const result = await reqLogin(username, password)
                console.log('请求成功', result)
                // const result = response.data //{status: 0, data: user}{status: 1, msg:'xxx'}
                if(result.status === 0){ // 登录成功
                    //提示登录成功
                    message.success('登录成功')
                    //跳转到后台管理界面(不需要再回退到登录)
                    const user = result.data
                    memoryUtils.user = user // 保存在内存中
                    storageUtils.saveUser(user) // 保存到local
                    this.props.history.replace('/')
                }else{ //登录失败
                    // 提示错误信息
                    message.error(result.msg)
                }           
            }else{
                console.log('校验失败')
            }
        })

        const form = this.props.form
        const values = form.getFieldsValue()
        console.log("values::::", values)
    }

    /*
        对密码进行自定义验证
    */
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd::::', rule, value)
        if(!value){
            callback('密码必须输入')
        }else if(value.length < 4){
            callback('密码长度不能小于4')
        }else if(value.length > 12){
            callback('密码长度不能大于12')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字、下划线')
        }else{
            callback()//验证通过
        }
        // callback('xxxx')// 验证失败，并提示指定的文本
    }


    render(){

        // 如果用户已经登录，自动跳转到管理界面
        const user = memoryUtils.user
        if( user && user._id){
            return <Redirect to='/'/>
        }
        // 得到功能强大的form对象
        const form = this.props.form
        const { getFieldDecorator } = form

        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username' ,
                                    { // 配置对象，属性名是特定的一些名称
                                        // 声明式验证：直接使用别人定义好的验证规则进行验证
                                        rules: [
                                            { 
                                                required:true, 
                                                whitespace: true,
                                                message:'请输入用户名' 
                                            },
                                            {
                                                min: 4,
                                                message:'用户名至少4位'
                                            },
                                            {
                                                max: 12,
                                                message: '用户名最多12位'
                                            },
                                            {
                                                pattern: /^[a-zA-Z0-9_]+$/, 
                                                message: '用户名必须是英文、数字、下划线'
                                            },
                                        ]
                                    }
                                )(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} /> }
                                        placeholder="Username"
                                    />
                                )
                            }
                            
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            { 
                                                validator: this.validatePwd
                                            }
                                        ]
                                    }
                                )(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} /> }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
高阶函数
    1).一类特别的函数
        a.接受函数类型的参数
        b.函数的返回值是函数
    2).常见的高阶函数
        a.定时器steTimeout()/setInterval()
        b.Promise: Promise(() => {}) then(value => {})
        c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        d.函数对象的bind()
        e.Form.create()()/getFieldDecorator()()

    3).高阶函数更加具有扩展性，更加动态

高阶组件
    1).本质就是一个函数
    2).接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件向被包装组件传入特定属性
    3).作用：扩展组件的功能
    4).高阶组件也是一个高阶函数：接受的是一个组件函数，返回的是一个新的组件函数

*/

const WrapLogin = Form.create()(Login)
export default WrapLogin


/*
1.作用
    简化promise对象的使用，不用通过.then()来指定成功/失败的回调函数
    以同步编码方式（没有回调函数）实现异步流程
2.哪里写await
    在返回promise的表达式左侧写await，不想要promise，而想要promise异步执行的成功的value数据
3.哪里写async
    await所在函数（最近）定义的左侧
*/

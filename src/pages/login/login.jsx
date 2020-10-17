import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd'
// Icon用法改变了
import './login.less'
import logo from './images/logo.jpg'

// 登录的路由组件
class Login extends Component{

    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()
        // 对所有的表单字段进行校验
        this.props.form.validateFields((err, values) => {
            // 校验成功
            if(!err){
                console.log('提交登录的ajax请求：', values)
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
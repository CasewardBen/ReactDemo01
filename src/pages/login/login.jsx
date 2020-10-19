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
        // 得到form对象
        const form = this.props.form
        // 获取表单项的输入数据
        const values = form.getFieldsValue()
        console.log('values:::', values)
    }

    render(){
        // 得到具有强大功能的form对象
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
                                    'username', 
                                    {
                                        rules:[{required:true, message:'输入用户名'}],
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
                                        rules:[{required:true, message:'输入密码'}],
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

高阶组件
*/
/*
包装Form组件，生成一个新的组件
新组件向Form组件传递一个强大的对象属性
*/

const WrapLogin = Form.create()(Login)
export default WrapLogin
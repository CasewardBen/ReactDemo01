import React, {Component} from 'react'

import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'

const { Footer, Sider, Content } = Layout
// 后台管理的路由组件
export default class Admin extends Component{
    render(){
        const user = memoryUtils.user
        // 如果内存中没有存储user ==》 当前没有登陆
        if(!user || !user._id){
            // 自动跳转到登录（在render()中）
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/bar' component={Bar}/>
                            <Route path='/line' component={Line}/>
                            <Route path='/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color:'#cccccc'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
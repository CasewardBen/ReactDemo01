import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import logo from '../../assets/images/logo.jpg'
import menuList from '../../config/menuConfig'
import './index.less'

const SubMenu = Menu.SubMenu

/*
  左侧导航的组件
*/
class LeftNav extends Component {
  /*
  根据menu的数据数组生成对应的标签数组
  使用map + 递归调用
  */
  getMenuNodes_map = (menuList) => {  
    return menuList.map(item => {
      /*
      {
        title: '首页',
        key: '/home',
        icon: 'home',
        children: []
      }

      <Menu.Item key="/home">
        <Link to='/home'>
          <Icon type="pie-chart" />
          <span>首页</span>
        </Link>
      </Menu.Item>

      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="mail" />
            <span>商品</span>
          </span>
        }
      >
        <Menu.Item/>
      </SubMenu>
      */
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  /*
  根据menu的数据数组生成对应的标签数组
  使用reduce + 递归调用
  */
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    console.log('path::::', path)
    // 得到需要打开菜单项的key
    // const openKey = this.openKey

    return menuList.reduce((pre, item) => {
      // 向pre中添加<Menu.Item>或者<SubMenu>
      if(!item.children){
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        // 查找与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果存在，说明当前item所对应的子列表需要展开
        if(cItem){
          this.openKey = item.key
        }
        
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
      return pre
    },[])
  }

  // 在第一次render之前执行一次
  // 为第一次render渲染准备数据（必须是同步的数据）
  // 这个生命周期函数已经弃用，后续使用其他方式替代
  UNSAFE_componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
    console.log('this.menuNodes::::', this.menuNodes)
  }

  render() {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    console.log('render()', path)
    // 得到需要打开菜单项的key
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to='/'  className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>测试后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {/*
          <Menu.Item key="/home">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to='/category'>
                <Icon type="pie-chart" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to='/product'>
                <Icon type="pie-chart" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user">
            <Link to='/user'>
              <Icon type="pie-chart" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/role">
            <Link to='/role'>
              <Icon type="pie-chart" />
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          */}

          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

/*
高阶组件withRouter
包装非路由组件，返回一个新的组件
新组件向非路由组件传递3个属性：history，location，match
*/
export default withRouter(LeftNav)
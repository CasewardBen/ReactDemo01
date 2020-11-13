import React, {Component} from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './addUpdate'
import ProductDetail from './detail'

/*
  商品路由
*/
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact/> {/*路径完全匹配*/}
        <Route path='/product/addupdate' component={ProductAddUpdate}/>
        <Route path='/product/detail' component={ProductDetail}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
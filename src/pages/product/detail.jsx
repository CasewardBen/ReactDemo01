import React, {Component} from 'react'
import {
  Card,
  Icon,
  List,
} from 'antd'
const Item = List.Item

/*
Product的详情子路由组件
*/
class ProductDetail extends Component {
  state = { 

    }
  render() {
    const title = (
      <span>
        <Icon type="arrow-left"/>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">aaa </span>
            <span>bbbb</span>
          </Item>
          <Item>
            <span className="left">aaa </span>
            <span>bbbb</span>
          </Item>
          <Item>
            <span className="left">aaa </span>
            <span>bbbb</span>
          </Item>
          <Item>
            <span className="left">aaa </span>
            <span dangerouslySetInnerHTML={{__html:'<p>商品详情的内容标题</p>'}}></span>
          </Item>
        </List>
      </Card>
    )
  }
}

export default ProductDetail;
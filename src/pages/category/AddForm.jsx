import React, {Component} from 'react'
import {
  Form,
  Select,
  Input,
} from 'antd'
// 添加分类的form组件

const Item = Form.Item
const Option = Select.Option
class AddForm extends Component {
  state = {  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue:'a',
            })(
              <Select>
                <Option value='a'>aa</Option>
                <Option value='c'>ca</Option>
                <Option value='b'>ba</Option>
              </Select>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue:'',
            })(
              <Input
                placeholder="请输入分类名称"
              />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)
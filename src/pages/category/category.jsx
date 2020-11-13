import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'
import {reqCategory, reqAddCategory, reqUpdateCategory} from '../../api'

import LinkButton from '../../components/link-button'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
/*
  商品分类路由
*/
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    category : [], // 这是一级分类列表
    subCategory: [], // 二级分类列表
    parentId: '0', // 当前需要显示分类列表的partentId
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0, // 标志添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
  }

  // 初始化table列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
            {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数中调用处理的函数并传入参数 */}
            {this.state.parentId === '0' ? <LinkButton onClick={() => {this.showSubCategory(category)}}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ]
  }

  // 异步获取一级或二级分类列表显示
  // parentId如果没有指定根据状态中的parentId请求，如果制定了根据指定的请求
  getCategory = async (parentId) => {
    // 在发请求前显示loading
    this.setState({loading:true})
    parentId = parentId || this.state.parentId
    // 发异步ajax请求，获取数据
    const result = await reqCategory([parentId])
    // 请求结束后，隐藏loading
    this.setState({loading:false})
    if(result.status === 0){
      // 取出分类数组数据（可能是一级的也可能是二级的）
      const category = result.data
      if(parentId === '0'){
        // 更新一级分类状态
        this.setState({
          category
        })
      } else {
        // 更新一级分类状态
        this.setState({
          subCategory: category
        })
      }
      
    }else{
      message.error('获取分类列表失败')
    }
  }

  // 显示指定一级分类对象的二级分类列表
  showSubCategory = (category) => {
    // 先更新状态，设置状态是异步的，不能立即获取最新的状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 回调函数在状态更新且重新render后执行
      // 调用二级分类列表
      this.getCategory()
    })
  }

  // 显示一级分类列表
  showCategory = () => {
    // 更新为一级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategory: []
    })
  }

  // 点击取消
  handleCancel = () => {
    // 清楚输入数据
    this.form.resetFields()
    // 隐藏输入框
    this.setState({
      showStatus:0
    })
  }

  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if(!err){
        this.setState({
          showStatus: 0
        })
    
        // 收集数据并提交添加分类请求
        const {parentId, categoryName} = this.form.getFieldsValue()
        // 清除输入数据
        this.form.resetFields()
        const result = await reqAddCategory(categoryName, parentId)
        if(result.status === 0){
          // 添加的分类是当前分类
          if(parentId === this.state.parentId){
            // 重新获取当前分类列表显示
            this.getCategory()
          } else if(parentId === '0'){ // 在二级分类列表下添加一级分类，重新获取一级分类列表但是不需要显示一级列表
            // 重新获取当前分类列表显示
            this.getCategory('0')
    
          }
        }
      }
    })
  }
  // 更新分类
  updateCategory = () => {
    // 进行表单验证，通过了才处理
    this.form.validateFields(async (err, values) => {
      if(!err){
        // 隐藏确认框
        this.setState({
          showStatus: 0
        })

        const categoryId = this.category._id
        const categoryName = this.form.getFieldValue('categoryName')
        // 清楚输入数据
        this.form.resetFields()
        // 发请求更新分类
        const result = await reqUpdateCategory({categoryId, categoryName})
        if(result.status===0){
          // 重新显示新的列表
          this.getCategory()
        }
      }
    })
    
  }

  // 显示添加
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示更新
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }

  // 为第一次render准备数据
  componentWillMount () {
    // 定义表格列
    this.initColumns()
  }

  // 执行异步任务：发送异步ajax请求
  componentDidMount () {
    // 获取分类列表
    this.getCategory()
  }

  render() {
    // 读取状态数据
    const {parentId, parentName, category, subCategory, loading, showStatus} = this.state

    // 读取指定的分类
    const categoryClicked = this.category || {} // 如果还没有指定一个空对象
    // 定义card右侧标题
    const title = parentId === '0' ? '一级标题' : (
      <span>
        <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight:5}}></Icon>
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
    )
    
    return (
      <Card className="" title={title} extra={extra}>
        <Table 
          dataSource={parentId==='0' ? category : subCategory}
          columns={this.columns}
          bordered
          rowKey='_id'
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
          loading={loading}
        >
        </Table>
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={(form)=>{this.form=form}}
            categorys={category} 
            parentId={parentId}
          />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={categoryClicked.name}
            setForm={(form)=>{this.form=form}}
          />
        </Modal>
      </Card>
    )
  }
}
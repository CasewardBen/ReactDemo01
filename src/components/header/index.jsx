import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { reqWeather } from '../../api'

import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'

import './index.less'

/*
  左侧导航的组件
*/
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间的字符串
    dayPictureUrl: '', // 天气的图片url
    weather: '', // 天气的文本
  }

  getTime = () => {
    // 每隔一秒获取当前时间，更新状态数据currentTime
    setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

  getWeather = async () => {
    // 调用接口请求函数，获取数据
    const {dayPictureUrl, weather} = await reqWeather('南京')
    this.setState({dayPictureUrl, weather})
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      // 如果当前item对象的key与path匹配，item.tile就是要显示的title
      if(item.key===path){
        title = item.title
      }else if(item.children){
        // 在所有的子item中查找匹配
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果有值说明有一个匹配的
        if(cItem){
          // 取出title
          title = cItem.title
        }
      }
    })
    return title
  }

  // 在第一次render之后执行一次，一般在此执行异步操作：发ajax请求；启动定时器
  componentDidMount(){
    // 获取当前时间
    this.getTime()
    // 获取当前天气显示
    this.getWeather()
  }

  // 不能这么做，不会更新显示
  // componentWillMount(){
  //   this.title = this.getTitle()
  // }

  render() {

    const { currentTime, dayPictureUrl, weather } = this.state
    const userName = memoryUtils.user.username
    // 得到当前需要显示的title
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{userName}</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {title}
          </div>
          <div className="header-bottom-right">
            <span>
              {currentTime}
            </span>
            {/* http://api.map.baidu.com/telematics/v3/weather?location=xx&output=json&ak=3p49MVra6urFRGOT9s8UBWr2 */}
            <img src={dayPictureUrl} alt="weather"/>
            <span>
              {weather}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
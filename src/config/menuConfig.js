const menuList =[
  {
    title: '首页',
    key: '/home',
    icon: 'home',
  },
  {
    title: '商品',
    key: '/products',
    icon: 'home',
    children: [
      {
        title: '商品分类',
        key: '/category',
        icon: 'home',
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'home',
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'home',
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'home',
  },
  {
    title: '图表',
    key: '/charts',
    icon: 'home',
    children:[
      {
        title: '条形图',
        key: '/line',
        icon: 'home',
      },
      {
        title: '饼状图',
        key: '/pie',
        icon: 'home',
      },
      {
        title: '柱状图',
        key: '/bar',
        icon: 'home',
      }
    ]
  },
]

// 默认暴露的模块，导入是可以命名为任意值
export default menuList
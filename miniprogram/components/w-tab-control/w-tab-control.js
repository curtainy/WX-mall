// components/w-tab-control/w-tab-control.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
 
  data: {
    currentIndex: app.globalData.currentIndex
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTab(event){
      app.globalData.currentIndex = event.currentTarget.dataset.index
      this.setData({
        currentIndex: app.globalData.currentIndex
      })
      //向页面发送事件
      const data = {index: this.data.currentIndex}
      this.triggerEvent('tabClick',data,{})
    }
  },

  lifetimes:{
    attached(){
      this.setData({
        currentIndex: app.globalData.currentIndex
      })
      console.log(app.globalData.currentIndex)
    }
  }
})

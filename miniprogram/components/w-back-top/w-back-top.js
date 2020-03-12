// components/w-back-top/w-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleBack(){
      //回到顶部
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})

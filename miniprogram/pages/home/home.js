import request from "../../server/network.js"

import {
  getMultiData,
  getGoodsData
}from '../../server/home.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    recommendList: [],
    titles: ['流行', '新款', '精选'],
    goods:{
      pop: { page: 0, list: [] },
      new: { page: 0, list: [] },
      sell: { page: 0, list: [] }
    },
    currentType: 'pop',
    isShow: false,
    isLoad: false,
    tabScrollTop: 0
  },

 /**
  * 页面初次加载时调用
  */
  onLoad(){
    //1.获取轮播图以及推荐数据
    this.getMultiList()
    //2.获取商品数据
    this.getGoodsList('pop')
    this.getGoodsList('new')
    this.getGoodsList('sell')
  },
  
  //-----------------------------网络请求-------------------------
  /**
   * 请求轮播图数据和推荐数据
   */
  getMultiList(){
    getMultiData().then(res => {
      this.setData({
        swiperList: res.data.data.banner.list,
        recommendList: res.data.data.recommend.list
      })
    })
  }, 

  /**
   * 请求商品数据
   */
  getGoodsList(type){
    //1.获取页码
    const page = this.data.goods[type].page + 1
    //2.发送网络请求
    getGoodsData(type,page).then(res => {
      //2.1取出数据
      const list = res.data.data.list
      //2.2将数据存放在对应type的list中
      const newList = this.data.goods[type].list
      newList.push(...list)
      //2.3将数据设置到type对应的goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: newList,
        [pageKey]: page
      })
    })
  },

 //-----------------------------------事件监听-------------------------
  /**
   * 点击tab control
   */
  tabClick(event){
    //1. 取出index
    const index = event.detail.index
    //2. 判断当前选中的类型
    let type= ''
    switch(index){
      case 0:  type = 'pop'; break;
      case 1:  type = 'new'; break;
      case 2:  type = 'sell'; break;
      default: 
    }
    //改变currentType
    this.setData({
      currentType: type
    }) 
  },
   /**
    * 图片加载完成
    */
  // imgLoad(){
  //   if(!this.data.isLoad){
  //     //1.改变isLoad值
  //     this.setData({
  //       isLoad: true
  //     })
  //     //2.获取tab_control距离顶部的高度
  //     wx.createSelectorQuery().select('#tab_control').boundingClientRect(rect => {
  //       this.setData({
  //         tabScrollTop: rect.top
  //       })
  //     })
  //   }
  // }, 
  /**
   * 下拉加载更多
   */
  onReachBottom(){
    this.getGoodsList(this.data.currentType)
  },

  /**
   * 显示回到顶部按钮
   */
  onPageScroll(options){
    const scrollTop = options.scrollTop
    if (scrollTop >= 500) {
      this.setData({
        isShow: true,
      })
    } else {
      this.setData({
        isShow: false
      })
    } 
  }
})
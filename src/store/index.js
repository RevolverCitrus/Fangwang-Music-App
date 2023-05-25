import {
  createStore
} from 'vuex'
import { getUUID } from '@/utlis/uuid_token'
import {getMusicLyric,getTopList,getMvTop} from '../request/api/itemMusic'
import {getPhoneLogin,getEmailLogin} from '../request/api/home'

export default createStore({
  state: {
    playList: [{
      al: {
        id: 161996623,
        name: "声音",
        pic: 109951168475709970,
        picUrl: "https://p1.music.126.net/eble6u8GXivcHyZ9PS6P0w==/109951168475709963.jpg",
        pic_str: "109951168475709963"
      },
      id: 2031085185,
      ar:[{
        id: 12037117, name: 'YOUNG'
      }]
    }],
    playListIndex: 0,
    isBtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList:{},//歌词部分
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否已经登录
    isFooterMusic:true,//判断底部组件是否需要显示
    uuid_token:getUUID(),//游客登录验证
    songList:[],//歌单列表
    topList:[],//排行榜
    mvTopIdList:[],//mv榜单的id
  },
  getters: {},
  mutations: {
    updateIsBtnShow: (state, value) => {
      state.isBtnShow = value
    },
    updatePlayList: (state, value) => {
      state.playList = value
      console.log(state.playList)
    },
    updatePlayListIndex: (state, value) => {
      state.playListIndex = value
    },
    updateDetailShow: (state) => {
      state.detailShow = !state.detailShow
    },
    updateLyricList:(state,value)=>{
      state.lyricList=value
    },
    updateCurrentTime:(state,value)=>{
      state.currentTime=value
    },
    updateDuration:(state,value)=>{
      state.duration=value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    getUuidToken:(state,value)=>{
      state.uuid_token=getUUID()
      console.log(state.uuid_token);
    },
    updateSongList:(state,value)=>{
      state.songList=value
    },
    updateTopList:(state,value)=>{
      state.topList=value
      // console.log(state.topList);
    },
    //更新MV榜单的数据
    updateMvTop:(state,value)=>{
      state.mvTopIdList=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      const res=await getMusicLyric(value)
      context.commit('updateLyricList',res.data.lrc)
    },
    //获取歌曲榜单
    getTopList:async(context,value)=>{
      const res=await getTopList(value)
      // console.log(res.data.list);
      context.commit('updateTopList',res.data.list.slice(0,4))
    },
    //获取MV榜单
    getMvTop:async(context,value)=>{
      const res=await getMvTop(value)
      // console.log(res);
      const result=res.data.data.map((item)=>({
        id:item.id
      }))
      console.log(result);
      context.commit('updateMvTop',result)
    },
    // getPhoneLogin:async function(context,value){
    //   const res =await getPhoneLogin(value);
    //   console.log(res);
    // },
    // getEmailLogin:async function(context,value){
    //   const res =await getEmailLogin(value);
    //   console.log(res);
    // }
  },
  modules: {}
})
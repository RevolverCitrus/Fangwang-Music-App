import service from '../index'


// 获取首页轮播图的数据
export const getBanner = () => service({
    url: '/banner?type=1',
    method: 'get'
})

// 获取发现好歌单的数据
export const getMusicList = () => service({
    url: '/personalized?limit=10',
    method: 'get'
})

// 获取搜索页的数据
export const getSearchMusic = (data) => service({
    method: "GET",
    url: `/search?keywords=${data}`
})

// 手机号码登录的接口
export const getPhoneLogin = (data) => service({
    method: 'get',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
}).then(function (res) {
    console.log(res.data)
    axios({
        url: `/recommend/resource`,
        withCredentials: true, //关键
    }).then(function (res) {
        console.log(res.data)
    })
})

//网易邮箱登录的接口
export const getEmailLogin = (data) => service({
    method: 'get',
    url: `/login?email=${data.email}@163.com&password=${data.password}`
}).then(function (res) {
    console.log(res.data)
    axios({
        url: `/recommend/resource`,
        withCredentials: true, //关键
    }).then(function (res) {
        console.log(res.data)
    })
})

// 歌手分类列表

// 歌手热门50首歌曲

// 歌单分类

//热门歌单分类


//音乐是否可用

//热搜列表(详细)

//歌曲评论

//歌单评论

//相关视频
///related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D

import service from '../index'

//获取歌单详情页数据
export const getMusicItemList=(data)=>service({url:`/playlist/detail?id=${data}`,method:'get'})

// 获取歌单的所有歌曲
export const getMusicList=(data)=>service({url:`/playlist/track/all?id=${data}&limit=20&offset=0`})

// 获取歌曲的歌词
export const getMusicLyric=(data)=>service({url:`/lyric?id=${data}`,method:'get'})


//歌单 ( 网友精选碟 )
export const getSongList=(data)=>service({
    method:'get',
    url:`/top/playlist?limit=${data}&order=hot`
})

// 获取歌曲的mv
export const getMusicMv=(data)=>service({url:`/mv/url?id=${data}`,method:'get'})

//获取歌曲MV的相关视频
// export const getRelatedMv=(data)=>service({url:`/related/allvideo?id=${data}`,method:'get'})

//获取排行榜的数据
export const getTopList=(data)=>service({url:'/toplist/detail',method:'get'},)

//获取MV榜单的数据
export const getMvTop=(data)=>service({url:'/top/mv?limit=30',method:'get'})

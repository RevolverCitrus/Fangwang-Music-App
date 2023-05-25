<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="MusicDetail">
        <div class="detailTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="leftText">
                    <Vue3Marquee scrolldelay="300" class="marquee">{{ musicList.al.name }}</Vue3Marquee>
                    <div>
                        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
                        <svg class="icon liebiao" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou1"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="topRight">
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <div class="detailContent" v-show="!isLyricShow">
            <img src="../../assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isBtnShow }">
            <img src="../../assets/cd.png" alt="" class="img_cd">
            <img :src="musicList.al.picUrl" alt="" class="img_picUrl"
                :class="!isBtnShow ? 'img_picUrl_active' : 'img_picUrl_paused'" @click="changeMusicLyric">
        </div>
        <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
            <p v-for="item in lyric" :key="item" :class="{
                active: currentTime * 1000 >= item.time && currentTime * 1000 < item.pre
            }" @click="changeMusicLyric">{{
    item.lrc }}</p>
        </div>
        <div class="detailFooter">
            <div class="footerTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao-"></use>
                </svg>
            </div>
            <div class="footerContent">
                <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"/>
            </div>

            <div class="footer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" v-else @click="playMusic">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            isLyricShow: false
        }
    },
    computed: {
        ...mapState(["lyricList", "currentTime", "playListIndex", "playList",'duration']),
        lyric: function () {
            let arr;
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    let time =
                        parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                        time =
                            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    }
                    // console.log(min,sec,Number(mill),lrc);
                    return { min, sec, mill, lrc, time };
                });
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time;
                    }
                });
            }
            // console.log(arr);
            return arr;
        },
    },
    mounted() {
        this.addDuration()
    },
    methods: {
        ...mapMutations(['updateDetailShow', "updatePlayListIndex"]),
        show() {
            return (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre)
        },
        changeMusicLyric() {
            this.isLyricShow = !this.isLyricShow
        },
        goPlay(num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1;
            } else if (index == this.playList.length) {
                index = 0;
            }
            this.updatePlayListIndex(index)
        }
    },
    watch: {
        // 歌词滚动未完成
        currentTime:function(newValue){
            // let p =document.querySelector('p.active')
            // // console.log([p]);
            // if(p.offsetTop>300){
            //     this.$refs.musicLyric.offsetTop-400
            // }
            if(newValue===this.duration){
                if(this.playListIndex===this.playList.length-1){
                    this.updatePlayListIndex(0);
                    this.playMusic()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1)
                }
            }
        }
    },
    props: ['musicList', 'isBtnShow', 'playMusic','addDuration'],
    components: {
        Vue3Marquee
    }
}
</script>

<style lang="less" scoped>
.bgimg {
    width: 100%;
    height: 70%;
    position: absolute;
    z-index: -1;
    filter: blur(60px);
}

.MusicDetail {
    // padding: .2rem;

    .detailTop {
        padding: .2rem;
        padding-top: .3rem;
        background-color: #3e3d3221;
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border-radius: .2rem;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;

        .topLeft {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                width: .6rem;
                height: .6rem;
                fill: #fff;
            }

            .leftText {
                margin-left: .2rem;
                display: flex;
                flex-direction: column;

                .marquee {
                    font-weight: 900;
                    color: #fff;
                }

                div {
                    span {
                        color: #fff;
                    }

                    .icon {
                        vertical-align: middle;
                        width: 0.3rem;
                        height: 0.3rem;
                        fill: #fff;
                    }
                }
            }
        }

        .topRight {
            .icon {
                display: block;
                width: .6rem;
                height: .6rem;
                fill: #fff;
            }
        }
    }

    .detailContent {
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .img_needle {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-15deg);
            transition: all 2s;
        }

        .img_needle_active {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }

        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }

        .img_picUrl {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }

        .img_picUrl_active {
            animation-play-state: running;
        }

        .img_picUrl_paused {
            animation-play-state: paused;
        }

        @keyframes rotate_ar {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
    }

    .musicLyric {
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.2rem;
        overflow: scroll;

        p {
            color: black;
            margin-bottom: 0.3rem;
        }

        .active {
            color: #fff;
            font-size: 0.5rem;
        }
    }

    .detailFooter {
        width: 100%;
        height: 4rem;
        position: absolute;
        bottom: .2rem;
        // margin-top: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        // align-items: center;
        .footerTop {
            // height: 2rem;
            width: 100%;
            display: flex;
            justify-content: space-around;
            justify-items: center;

            .icon {
                width: .6rem;
                height: .6rem;
            }
        }

        .footerContent {
            .range {
                width: 100%;
                height: 0.06rem;
            }
        }

        .footer {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .bofang {
                width: 1rem;
                height: 1rem;
            }
        }
    }
}
</style>
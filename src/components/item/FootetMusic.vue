<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="musicOut">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="textBox">
                <p>{{ playList[playListIndex].al.name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon liebiao" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="playMusic" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :playMusic="playMusic" :isBtnShow="isBtnShow" :addDuration="addDuration"></MusicDetail>
        </van-popup>
    </div>
</template>

<script>
import MusicDetail from '@/components/item/MusicDetail'
import { onMounted, onUpdated, watch } from 'vue';
import { mapState, useStore } from 'vuex';
import { ref } from 'vue';
export default {
    setup() {
        let interVal;
        const store = useStore()
        const audio = ref(null)
        // 播放按钮的函数
        const playMusic = () => {
            if (audio.value.paused) {
                audio.value.play();
                store.commit('updateIsBtnShow', false)
                updateTime()
            } else {
                audio.value.pause()
                store.commit('updateIsBtnShow', true)
                clearInterval(interVal)
            }
        };
        const updateTime=()=>{
            interVal=setInterval(()=>{
                store.commit('updateCurrentTime',audio.value.currentTime)
            },1000)
        }
        // 歌单详情页的弹出
        const musicOut=()=>{
                console.log(store);
                store.commit('updateDetailShow')
        };
        const addDuration=()=>{
            store.commit('updateDuration',audio.value.duration)
        }

        //监听如果下标发送改变，就自动播放音乐
        watch(() => store.state.playListIndex, () => {
            audio.value.autoplay = true;
            store.dispatch('getLyric',store.state.playList[store.state.playListIndex].id)
            if (audio.value.paused) {//如果暂停状态就改变图标
                store.commit('updateIsBtnShow', false)
            }
        }),
            watch(() => store.state.playList, () => {
                if (store.state.isBtnShow) {
                    audio.value.autoplay = true;
                    store.commit('updateIsBtnShow', false)
                }
            })
        
        onMounted(() => {
            store.dispatch('getLyric',store.state.playList[store.state.playListIndex].id)
            updateTime()
        })
        onUpdated(()=>{
            store.dispatch('getLyric',store.state.playList[store.state.playListIndex].id)
            addDuration()
        })
        return {
            playMusic,
            audio,
            musicOut,
            updateTime,
            addDuration
        }
    },
    computed: {
        ...mapState(["playList", "playListIndex", 'isBtnShow','detailShow']),
    },
    components:{
        MusicDetail
    }
}
</script>

<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    padding: .2rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    justify-content: space-between;

    .footerLeft {
        display: flex;
        height: 100%;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: .2rem;
        }

        .textBox {
            p {
                font-weight: 700;
            }

            span {
                font-weight: 400;
                font-size: 0.24rem;
                color: #999;
            }
        }
    }

    .footerRight {
        display: flex;
        height: 100%;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }

        .icon:nth-child(1) {
            margin-right: .2rem;
        }
    }
}
</style>
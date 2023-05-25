<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more" @click="router.push('/songlist')">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item.id" class="swiper-item"
                    @click="goToItemMusic(item.id)">
                    <!-- <router-link :to="{path:'/itemMusic',query:{id:item.id}}"> -->
                    <img :src="item.picUrl" alt="">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true" >
                            <use xlink:href="#icon-24gl-play" fill="#fff"></use>
                        </svg>
                        {{ changeCount(item.playCount) }}
                    </span>
                    <span class="name">{{ item.name }}</span>
                    <!-- </router-link> -->
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicList } from '@/request/api/home';
export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            musicList: []
        });
        // 歌单播放量处理函数
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            } else {
                return num
            }
        };
        // 编程式导航-歌单详情页
        const goToItemMusic = (id) => {
            router.push({ path: '/itemMusic', query: { id:id } })
        }

        onMounted(async () => {
            const res = await getMusicList();
            state.musicList = res.data.result
            // console.log(res.data.result)
        })
        return {
            router,
            state,
            changeCount,
            goToItemMusic,
        }
    },
}
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            border-radius: 0.4rem;
            padding: 0 0.2rem;
        }
    }

    .musicContent {
        width: 100%;
        height: 3.6rem;

        .my-swipe {
            height: 100%;

            .swiper-item {
                position: relative;
                padding-left: .2rem;

                img {
                    width: 100%;
                    height: 2.8rem;
                    border-radius: 0.2rem;
                }

                .playCount {
                    position: absolute;
                    z-index: 100;
                    right: .2rem;
                    top: 0.1rem;
                    color: #fff;

                    .icon {
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        vertical-align: bottom;
                        fill: #fff // display: inline-block;
                    }
                }

                .name {
                    font-size: 14px;
                }
            }

        }
    }
}</style>
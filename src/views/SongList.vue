<template>
    <div class="songList">
        <div class="listTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <p>歌单广场</p>
        </div>
        <div class="listContent">
            <div class="listItem" v-for="item in songList" :key="item">
                <img :src="item.coverImgUrl" alt="">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-play" fill="#fff"></use>
                    </svg>
                    {{ changeCount(item.playCount) }}
                </span>
                <span class="name">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { getSongList } from '@/request/api/itemMusic';
import { onMounted, computed } from 'vue';
export default {
    setup() {
        const store = useStore()
        onMounted(async () => {
            const res = await getSongList(50)
            // console.log(res);
            store.state.songList = res.data.playlists
            store.state.isFooterMusic = false
            console.log(store.state.songList);
        })
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

    return {
        store,
        // 在 computed 函数中访问 state
        songList: computed(() => store.state.songList),
        changeCount,
    }
},
}
</script>

<style lang="less" scoped>
.songList {
    // display: flex;
    // padding: .2rem;

    .listTop {
        background-color: #c20c0c;
        z-index: 999;
        position: sticky;
        top: 0;
        display: flex;
        color: #fff;
        width: 100%;
        height: 1rem;
        // justify-content: space-between;
        align-items: center;

        .icon {
            fill: #fff;
            width: .6rem;
            height: 0.6rem;
            margin: 0 .2rem;
        }

        p {
            font-weight: 700;
            font-size: 16px;
        }
    }

    .listContent {
        padding: .2rem;
        width: 100%;
        // height: 10rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .listItem {
            display: flex;
            flex-direction: column;
            position: relative;
            padding-left: .2rem;
            width: 40%;
            margin-top: .5rem;
            border-radius: .4rem;

            // box-shadow: 0 -0.2rem #bfa;
            // background-color: #ccc;
            img {
                width: 2.5rem;
                height: 2.5rem;
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
                width: 2.5rem;
            }
        }
    }
}
</style>
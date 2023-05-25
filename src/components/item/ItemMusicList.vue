<template>
    <div class="ItemMusicList">
        <div class="ItemListTop">
            <div class="TopLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span class="text1">播放全部<span>(共20首)</span></span>
            </div>
            <div class="TopRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ changeCount(subscribedCount) }})</span>
            </div>
        </div>

        <div class="itemList">
            <div class="item" v-for="(item, i) in itemMusicList" :key="i">
                <div class="itemLeft" @click="playMusic1(i)">
                    <span class="leftNum">{{ i + 1 }}</span>
                    <div class="rightName">
                        <p>{{ item.al.name }}</p>
                        <div class="authorName">
                            <span v-for="(author, i) in item.ar.slice(0,3)" :key="i">{{ author.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if='item.mv != 0' @click="playVideo(item.name,item.mv)">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { mapMutations, useStore } from 'vuex';

export default {
    setup(props) {
        const router=useRouter()
        const store = useStore()
        console.log(props)
        // 歌单收藏量处理函数
        const changeCount = (num) => {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            } else {
                return num
            }
        };
        const playVideo=(mvName,mvId)=>{
            // console.log(mvName);
            router.push({path:'/musicmv',query:{mvName:mvName,mvId:mvId}})
        }
        return {
            changeCount,
            playVideo,
            router
        }
    },
    props: ['itemMusicList', 'subscribedCount'],
    methods: {
        playMusic1(i) {
            console.log(this.itemMusicList)
            this.updatePlayList(this.itemMusicList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList', "updatePlayListIndex"])
    }
}
</script>

<style lang="less" scoped>
.ItemMusicList {
    width: 100%;
    background-color: #fff;
    padding: .2rem 0.2rem 1.4rem;
    margin-top: 0.4rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.222);

    .ItemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;

        .TopLeft {
            width: 4rem;
            height: 100%;
            display: flex;
            align-items: center;
            // justify-content: space-between;

            .icon {
                width: 0.6rem;
                height: 0.6rem;
                margin-right: .2rem;
            }

            .text1 {
                width: 3rem;
                margin-left: .2rem;
                font-size: .36rem;
                font-weight: 600;

                span {
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }
            }
        }

        .TopRight {
            display: flex;
            align-items: center;
            // justify-content: space-between;
            // justify-content: center;
            background-color: #ff1a00;
            color: #fff;
            border-radius: 0.5rem;
            padding: 0.2rem;
            flex-wrap: nowrap;

            // margin: .2rem;
            .icon {
                width: 0.4rem;
                height: 0.4rem;
                fill: #fff;
                margin-right: 0.1rem;
            }

            span {
                display: flex;
            }
        }
    }

    .itemList {
        .item {
            display: flex;
            width: 100%;
            height: 1.4rem;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, .03);

            .itemLeft {
                width: 80%;
                height: 100%;
                display: flex;
                vertical-align: middle;
                align-items: center;

                .leftNum {
                    width: 10%;
                    line-height: 100%;
                    margin-left: 0.1rem;
                }

                .rightName {
                    display: flex;
                    flex-direction: column;

                    p {
                        width: 4rem;
                        margin-bottom: .1rem;
                        font-weight: 700;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .authorName {
                        line-height: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        vertical-align: baseline;
                        span {
                            margin-right: .1rem;
                            font-weight: 400;
                            font-size: .24rem;
                            color: #999;
                        }
                    }
                }
            }

            .itemRight {
                display: flex;
                justify-content: space-between;

                .icon {
                    fill: #999;
                }

                .bofang {
                    margin-right: .4rem;
                }
            }
        }
    }
}
</style>
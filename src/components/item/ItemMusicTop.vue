<template>
    <div>
        <div class="ItemMusicTop">
            <img :src="playlist.coverImgUrl" alt="" class="bigImg">
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>

        <div class="ItemMusicContent">
            <div class="contentLeft">
                <img :src="playlist.coverImgUrl" alt="">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-play"></use>
                    </svg>
                    {{ changeCount(playlist.playCount) }}
                </span>
            </div>
            <div class="contentRight">
                <p class="textTop">{{ playlist.name }}</p>
                <div class="textCenter">
                    <img :src="playlist.creator.backgroundUrl" alt="" />
                    <span>{{ playlist.creator.nickname }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <p class="textFooter">
                    <span>{{ playlist.description }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </p>
            </div>
        </div>

        <div class="ItemMusicFooter">
            <ul class="footerItemList">
                <li class="footerItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
                    </svg>
                    <span>{{ playlist.commentCount }}</span>
                </li>
                <li class="footerItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang"></use>
                    </svg>
                    <span>{{ playlist.shareCount }}</span>
                </li>
                <li class="footerItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                    </svg>
                    <span>下载</span>
                </li>
                <li class="footerItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-show_duoxuan"></use>
                    </svg>
                    <span>多选</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
        props.playlist.creator = ""
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
            changeCount
        }
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>

.ItemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;

        span {
            font-size: .4rem;
            color: #fff;
        }

        .icon {
            fill: #fff //svg填充颜色
        }
    }

    .bigImg {
        width: 100%;
        height: 70%;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }
}

.ItemMusicContent {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    margin-top: 0.4rem;

    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;
        margin-right: .4rem;

        img {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: .2rem;
            // position: absolute;
            z-index: -1;
        }

        .playCount {
            position: absolute;
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
    }

    .contentRight {
        height: 2.6rem;
        width: 60%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .textTop {
            font-size: 0.3rem;
            font-weight: 900;
            color: #fff;
            font-family: "微软雅黑";
        }

        .textCenter {
            width: 100%;
            height: .6rem;
            line-height: .6rem;
            color: #ccc;

            img {
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.1rem;
            }

            .icon {
                width: .26rem;
                height: .26rem;
                vertical-align: middle;
                // margin-top: -0.08rem;
            }
        }

        .textFooter {
            width: 100%;
            height: .6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
                display: inline-block;
                width: 95%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.24rem;
                color: #ccc;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .icon {
                width: 0.24rem;
                height: 0.24rem;
            }
        }
    }
}

.ItemMusicFooter {
    .footerItemList {
        width: 100%;
        // height: 1rem;
        display: flex;
        justify-content: space-around;
        margin: .2rem 0;

        .footerItem {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            color: #fff;

            .icon {
                fill: #fff;
                width: .5rem;
                height: .5rem;
            }

            span {
                margin-top: .2rem;
            }
        }
    }
}</style>
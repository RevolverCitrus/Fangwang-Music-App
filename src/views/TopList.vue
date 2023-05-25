<template>
    <div class="topList">
        <div class="listTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <p>排行榜</p>
        </div>
        <div class="listContent">
            <div class="Listitem" v-for="item in topList" :key="item" @click="itemDetail(item)">
                <div class="itemTop">
                    <span class="name">{{ item.name }}</span>
                    <span class="time">{{ item.updateFrequency }}</span>
                </div>
                <div class="itemContent">
                    <img :src="item.coverImgUrl" alt="">
                    <div class="musicList">
                        <div class="item" v-for="(item1,index) in item.tracks" :key="index">
                            {{index+1}}-{{ item1.first }}-{{ item1.second }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getMusicList} from '@/request/api/itemMusic'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router=useRouter()
        const store = useStore()

        onMounted(() => {
            store.dispatch('getTopList')
            console.log(store.state.topList);
        })

        const itemDetail=(data)=>{
            // const res=await getMusicList(id)
            // store.commit('updatePlayList',res.data.songs)
            // console.log(store.state.playList);
            router.push({path:'/topdetail',query: {id:data.id,name:data.name,coverImgUrl:data.coverImgUrl,description:data.description}})
        }

        return {
            store,
            topList: computed(() => store.state.topList),
            itemDetail,
            router
        }
    },
}
</script>

<style lang="less" scoped>
.topList {
    // display: flex;
    // padding: .2rem;

    .listTop {
        background-color: #c20c0c;
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
        width: 100%;
        padding-bottom: 2rem;
        .Listitem{
            width: 100%;
            margin-top: .4rem;
            padding:0 .2rem;
            .itemTop{
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
                .name{
                    font-weight: 700;
                    font-size: .5rem;
                }
                .time{
                    margin-right: .1rem;
                    font-size: .28rem;
                    color: #999;
                }
            }
            .itemContent{
                margin-top: .1rem;
                display: flex;
                align-items: center;
                img{
                    border-radius: .4rem;
                    width: 120px;
                    height: 120px;
                    margin-right: .2rem;
                }
                .musicList{
                    .item{
                        margin-top: .1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 5rem;
                    }
                }
            }
        }
    }
}
</style>
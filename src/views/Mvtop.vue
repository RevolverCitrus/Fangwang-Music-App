<template>
    <div class="mvTop">
        <div class="TopNav">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <p>MV榜单</p>
        </div>
        <div class="itemBox">
            <div class="item" v-for="item,index in mvList" :key="item">
                <p>{{ index+1 }}</p>
                <video :src=item.url controls loop playsinline></video>
            </div>
        </div>

    </div>
</template>

<script>
// import {getMvTop} from '@/store/index'
import { getMusicMv } from '@/request/api/itemMusic'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref } from 'vue'
export default {
    setup() {
        const mvList = reactive([])
        const store = useStore()
        onMounted(() => {
            store.dispatch('getMvTop').then(async (result) => {
                // console.log(store.state.mvTopIdList.length);
                for (let i = 0; i < store.state.mvTopIdList.length; i++) {
                    const id = store.state.mvTopIdList[i].id
                    // console.log(id);
                    const res = await getMusicMv(id)
                    // console.log(res);console.log(res.data.data.url);
                    mvList.push(res.data.data)
                    // console.log(mvList);
                }
                console.log(mvList);
            }).catch((err) => {
                console.log(err);
            });
        })
        return {
            store,
            // getMvTop,
            mvList,
            getMusicMv,
            mvTopIdList: computed(() => store.state.mvTopIdList)
        }
    },
}
</script>

<style lang="less" scoped>
.mvTop {
    padding-bottom: 1.5rem;
    .TopNav {
        background-color: #c20c0c;
        position: sticky;
        top: 0;
        display: flex;
        z-index: 999;
        color: #fff;
        width: 100%;
        height: 1rem;
        margin-bottom: .4rem;
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
    .itemBox {
        width: 100%;
        .item {
            width: 100%;
            margin-bottom: .5rem;
            // height: 8rem;
            p{
                width: 100%;
                height: 0.5rem;
                background-color: #33333387;
                text-align: center;
                color: #fff;
                font-weight: 700;
                font-size: 24px;
            }

            video {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
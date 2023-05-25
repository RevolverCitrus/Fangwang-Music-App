<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>

        <div class="topContent">
            <span @click="goto('/userinfo')" :class="{'active': $route.meta.active === '/userinfo'}">我的</span>
            <span @click="goto('/')" :class="{'active': $route.meta.active === '/'}">发现</span>
            <span>云村</span>
            <span @click="goto('/mvtop')">视频</span>
        </div>

        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="goto('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router =useRouter()
        const goto=(val)=>{
            router.push(val)
        }
    return{
        goto,
        router
    }
    },
}
</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 18px;
            .active{
                font-weight: 800;
            }
        }
    }
</style>
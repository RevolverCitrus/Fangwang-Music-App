<template>
    <TopNav></TopNav>
    <div class="userInfo">
        <div class="info">
            <img src="../assets/user-default.png" alt="">
            <p>游客</p>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue';
export default {
    setup() {

    },
    components:{
        TopNav
    }
}
</script>

<style lang="less" scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: .2rem;
    width: 100%;
    justify-items: center;
    height: 3rem;
    align-items: center;

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        justify-items: center;
        
        img {
            margin-bottom: .2rem;
            width: 2rem;
            height: 2rem;
        }
    }
}
</style>
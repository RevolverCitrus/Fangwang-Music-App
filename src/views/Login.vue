<template>
    <div class="Login">
        <p class="hi">欢迎来到仿云音乐</p>
        <!-- <van-cell-group inset> -->
            <!-- 输入手机号，调起手机号键盘 -->
            <!-- <van-field v-model="email" type="tel" label="手机号" /> -->
            <!-- 输入密码 -->
            <!-- <van-field v-model="password" type="password" label="密码" /> -->
        <!-- </van-cell-group> -->
        <van-button type="default" @click="Login">游客登录</van-button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const store=useStore()
        const router=useRouter()
        const phone=ref('')
        const email=ref('')
        const password=ref('')

        const Login=()=>{
            // store.dispatch('getPhoneLogin',{phone:phone,password:password})
            // store.dispatch('getEmailLogin',{email:email,password:password})
            store.commit('getUuidToken')
            if(localStorage.getItem('UUIDTOKEN')!==''){
                console.log(111);
                store.state.isLogin=true
                router.push('/userinfo')
            }
        }
    return{
        phone,
        email,
        password,
        store,
        Login,
        router
    }
    },
}
</script>

<style lang="less" scoped>
    .Login{
        width: 100%;
        height: 13.3rem;
        background-color: brown;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        justify-content: space-around;
        flex: 1;
        .hi{
            color: #fff;
            font-size: .72rem;
        }
    }
</style>
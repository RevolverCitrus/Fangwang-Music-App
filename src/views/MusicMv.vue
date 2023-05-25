<template>
    <div class="MusicMv">
        <div class="mvTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>MV</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
        <div class="mvBox">
            <p>{{ mvName }}</p>
            <video ref="video" controls loop></video>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getMusicMv } from '@/request/api/itemMusic'
export default {
    setup() {
        const video = ref('')
        const route = useRoute()
        const mvName = route.query.mvName
        const mvId = route.query.mvId
        onMounted(async () => {
            const mv = await getMusicMv(mvId)
            console.log(mvId);
            video.value.src = mv.data.data.url
        })
        return {
            route,
            mvName,
            mvId,
            video
        }
    },
}
</script>

<style lang="less" scoped>
.MusicMv {
    width: 100%;
    height: 6rem;

    .mvTop {
        background-color: #c20c0c;
        display: flex;
        color: #fff;
        font-weight: 700;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        margin-bottom: .2rem;

        .icon {
            fill: #fff;
            width: .5rem;
            height: .5rem;
        }
    }

    .mvBox {
        p{
            width: 100%;
            height: .6rem;
            background-color: #33333383;
            color: #fff;
            font-weight: 700;
            text-align: center;
            line-height: .6rem;
        }
        video {
            width: 100%;
            // height: 100%;
        }
    }

}
</style>
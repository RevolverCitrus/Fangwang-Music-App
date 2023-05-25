<template>
    <div class="TopDetail">
        <div class="DetailTop">
            <div class="Top">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <p>{{ name }}</p>
            </div>
            <div class="DetailContent">
                <img :src="url" alt="">
                <span>{{ description }}</span>
            </div>
        </div>
    </div>
    <ItemMusicList class="ItemMusicList" :itemMusicList="state.ItemMusicList"
        :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<script>
import ItemMusicList from '@/components/item/ItemMusicList.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getMusicList, getMusicItemList } from '@/request/api/itemMusic'
export default {
    setup() {
        const route = useRoute()
        const state = reactive({
            playlist: {},
            ItemMusicList: []
        })
        const url = route.query.coverImgUrl
        const name = route.query.name
        const description = route.query.description
        onMounted(async () => {
            const id = route.query.id;
            // 获取歌单详情
            const res = await getMusicItemList(id);
            // console.log(res)
            state.playlist = res.data.playlist

            // 获取歌单的歌曲
            const result = await getMusicList(id)
            // console.log(result)
            state.ItemMusicList = result.data.songs
            //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem("itemDetail", JSON.stringify(state));
        })
        return {
            url,
            name,
            description,
            route,
            state
        }
    },
    components: {
        ItemMusicList
    }
}
</script>

<style lang="less" scoped>
.TopDetail {
    .DetailTop {
        
        .Top {
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

        .DetailContent {
            margin-top: .4rem;
            width: 100%;
            height: 3rem;
            display: flex;
            align-items: center;
            color: #666;
            img{
                border-radius: 30%;
                width: 100%;
                height: 100%;
                margin-right: .2rem;
            }
        }
    }

}
</style>
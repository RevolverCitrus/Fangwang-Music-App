<template>
    <div>
        <ItemMusicTop class="itemMusicTop" :playlist="state.playlist"></ItemMusicTop>
        <ItemMusicList class="ItemMusicList" :itemMusicList="state.ItemMusicList"
            :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
    </div>
</template>

<script>
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicItemList, getMusicList } from '../request/api/itemMusic'
export default {
    setup() {
        const state = reactive({
            playlist: {},
            ItemMusicList: []
        })
        onMounted(async () => {
            const id = useRoute().query.id;
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
            state
        }
    },
    components: {
        ItemMusicTop,
        ItemMusicList
    }
}
</script>

<style lang="less" scoped>
div {
    position: relative;
    .itemMusicTop {
        position: fixed;
        top: 0;
    }

    .ItemMusicList {
        position: absolute;
        top: 6.12rem;
    }
}
</style>
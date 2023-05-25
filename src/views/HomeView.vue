<template>
  <div class="home">
    <TopNav></TopNav>
    <SwipeTop></SwipeTop>
    <IconList></IconList>
    <MusicListVue></MusicListVue>
  </div>
</template>

<script>
// @ is an alias to /src
import SwipeTop from '@/components/home/SwipeTop.vue';
import TopNav from '@/components/home/TopNav.vue';
import IconList from '@/components/home/IconList.vue';
import MusicListVue from '@/components/home/MusicList.vue';
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwipeTop,
    IconList,
    MusicListVue
  }
}
</script>

<style lang="less" scoped>

</style>

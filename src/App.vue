<template>
  <div id="app">
    <m-header></m-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  import VTab from 'components/tab/tab.vue'
  import Player from 'components/player/player.vue'
  export default {
    components: {
      MHeader,
      VTab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

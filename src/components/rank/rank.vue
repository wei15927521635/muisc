<template>
  <div class="rank">
    <div class="box" ref="audio"></div>
  </div>
</template>
<script type="text/ecmascript">
  import Audio from 'common/js/audio'
  export default {
    created() {},
    mounted() {
      console.log(this.$refs, '1')
      console.log(new Audio({el: this.$refs.audio}))
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  div
    color: #0af
    .box
      width: 100%
      height: 200px
      background: #fefefe
</style>
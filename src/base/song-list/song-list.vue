<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript">
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen'
      ])
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      getDesc(song) {
        return `${song.singer} · ${song.album}  ${song.albumdesc}`
      },
      selectItem(item, index) {
        this.$emit('selectItem', item, index)
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return `text`
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      // border-bottom: 1px solid #ccc
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            background-image: url('first@2x.png')
            background-position: center center
            // bg-image('first@2x.png')
          &.icon1
            background-image: url('second@2x.png')
            background-position: center center
            // bg-image('second@2x.png')
          &.icon2
            background-image: url('third@2x.png')
            background-position: center center
            // bg-image('third@2x.png')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: #000
          font-size: 16px
        .desc
          no-wrap()
          margin-top: 4px
          color: #777
          font-size: 13px
          width: 98%
</style>

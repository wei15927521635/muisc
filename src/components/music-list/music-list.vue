<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title" ref="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-if="songs.length > 0" ref="playBtn" @click="playAllRandom">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scrollFn" :probe-type="probeType" :listenScroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <p class="songe-title">歌曲 共{{songs.length}}首</p>
        <song-list @selectItem="selectItemFn" :rank="rank" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import { prefixStyle } from 'common/js/dom'
  import { playListMixin } from 'common/js/mixin'
  import Loading from 'base/loading/loading'
  import { mapActions, mapMutations } from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop')
  export default {
    mixins: [playListMixin],
    components: {
      Scroll,
      SongList,
      Loading
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.bgImage})`
      },
      ...mapMutations({
        setPlayList: 'SET_PLAYLIST'
      })
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
      ...mapActions(['selectPlay', 'randomPlay']),
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scrollFn(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItemFn(item, index) {
        this.selectPlay({list: this.songs, index: index})
      },
      playAllRandom() {
        this.randomPlay({list: this.songs})
        // console.log(this.songs)
      }
    },
    watch: {
      scrollY(newY) {
        let tranlateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        this.$refs.layer.style[transform] = `translate3d(0,${tranlateY}px,0)`
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = `none`
        } else {
          this.$refs.bgImage.style.paddingTop = `70%`
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ``
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      // background-color: rgba(0,0,0,.5)
      background-size: cover
      // background-repeat: no-repeat
      // background-position: 30px 40px
      .play-wrapper
        position: absolute
        bottom: 10px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 150px
          padding: 10px 0
          margin: 0 auto
          text-align: center
          border: 1px solid #31c27c
          color: #fff
          border-radius: 100px
          background: #31c27c
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        // background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: rgba(255, 255, 255, 1)
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: #fff
      .songe-title
        color: #777
        font-size: 14px
        line-height: 2
      .song-list-wrapper
        padding: 20px 0 20px 30px 
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
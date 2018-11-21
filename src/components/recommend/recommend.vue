<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommendLsit.length" class="slider-wrapper">
            <v-slider>
              <div v-for="item in recommendLsit">
                <a :href="item.linkUrl"> <!-- -->
                  <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                </a>
              </div>
            </v-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript">
  import Loading from 'base/loading/loading'
  import VSlider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import { playListMixin } from 'common/js/mixin'

  export default {
    mixins: [playListMixin],
    components: {
      VSlider,
      Scroll,
      Loading
    },
    data() {
      return {
        recommendLsit: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      setTimeout(() => {
        this._getDiscList()
      }, 200)
    },
    methods: {
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then(suc => {
          if (suc.code === ERR_OK) {
            this.recommendLsit = suc.data.slider
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getDiscList() {
        getDiscList().then(suc => {
          this.discList = suc.data.list
        }).catch(err => {
          console.log(err)
        })
      },
      loadImage() {
        if (!this.checkloaded) {
          this.$refs.scroll.refresh()
          this.checkloaded = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    background: #fefefe
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        ul
          // padding: 13px 0 0 0
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          color: #333
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: #0af
            .desc
              color: #333
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
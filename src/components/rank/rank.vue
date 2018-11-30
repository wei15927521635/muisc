<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <ul class="songlist">
            <li class="title">{{item.topTitle.split('·')[1] ? item.topTitle.split('·')[1] + '榜' : item.topTitle.split('·')[0]}}</li>
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}.</span>
              <span>{{song.songname}} - {{song.singername}}</span>
            </li>
          </ul>
          <div class="icon">
            <img v-lazy="item.picUrl" width="100" height="100" alt="">
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript">
  import { getRankList } from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { playListMixin} from 'common/js/mixin.js'
  import { mapMutations } from 'vuex'
  export default {
    mixins: [playListMixin],
    components: {
      Scroll,
      Loading
    },
    data() {
      return {
        topList: []
      }
    },
    created() {
      this._getRankList()
    },
    methods: {
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      }),
      handlePlayList(playlist) {
        const bottom = playlist.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      _getRankList() {
        getRankList().then(suc => {
          this.topList = suc.data.topList
        }).catch(err => {
          console.log(err)
        })
      },
      selectItem(item) {
        let obj = {path: `/rank/${item.id}`}
        this.$router.push(obj)
        this.setTopList(item)
      }
    },
    mounted() {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: #e6eaec
          color: $color-text-d
          font-size: $font-size-small
          .title
            color: #333
            font-size: 14px
            // font-weight: bold
          .song
            no-wrap()
            line-height: 26px
            color: #363636
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { getSuggest } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import { getMusicAdsress } from 'api/recommend'
  // let num = 1
  const TYPE_SINGER = 'singer'
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        retList: []
      }
    },
    methods: {
      _search() {
        getSuggest(this.query, this.page, this.showSinger).then(suc => {
          if (suc.code === ERR_OK) {
            let data = suc.data
            this._normalizeSongs(data.song.list)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        return `${item.name} - ${item.singer}`
      },
      _normalizeSongs(list) {
        this.result = []
        list.forEach((item, index) => {
          if (item.songid && item.albummid) {
            getMusicAdsress(item.songmid).then(suc => {
              const vkey = suc.data.items[0].vkey
              if (!vkey) return
              this.result.push(createSong(item, vkey, '117.34.59.14'))
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    },
    updated() {
      // this.result
    },
    created() {
      // this._search()
    },
    watch: {
      query(newVal) {
        this._search()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: #31c27c
      .name
        flex: 1
        font-size: $font-size-medium
        color: rgba(0,0,25,1)
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

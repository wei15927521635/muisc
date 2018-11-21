<template>
  <div class="singer" ref="singer">
    <list-view :data="singerLsit" @singer-select="singerSelect" ref="singerListView"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import listView from 'base/listView/listView'
  import Singer from 'common/js/singer'
  import { getSingerList } from 'api/singer.js'
  import { ERR_OK } from 'api/config.js'
  import { mapMutations } from 'vuex'
  import { playListMixin } from 'common/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    mixins: [playListMixin],
    components: {
      listView
    },
    data() {
      return {
        singerLsit: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.singerListView.refresh()
      },
      singerSelect(singer) {
        let obj = {path: `/singer/${singer.id}`}
        this.$router.push(obj)
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerLsit = this._normalizeSinger(res.data.list)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
        })
        // 为了得到有序列表，需要处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
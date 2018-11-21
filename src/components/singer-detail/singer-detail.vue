<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import { getSingerDetail } from 'api/singer'
  import { getMusicAdsress } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  
  export default {
    components: {
      MusicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        let _id = this.singer.id
        if (!_id) {
          this.$router.push({path: '/singer'})
          return
        }
        getSingerDetail(_id)
          .then(suc => {
            if (suc.code === ERR_OK) {
              this.songs = this._normalizeSongs(suc.data.list)
            }
          }).catch(err => {
            console.log(err)
          })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          let { musicData } = item
          if (musicData.songid && musicData.albummid) {
            getMusicAdsress(musicData.songmid).then(suc => {
              const vkey = suc.data.items[0].vkey
              ret.push(createSong(musicData, vkey))
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      },
      singerId() {
        // let hash = location.hash
        // let path = hash.split('/')[2]
        return ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition: all 0.5s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)  
</style>

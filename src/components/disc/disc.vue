<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list'
  import { getMusicAdsress, getSongList } from 'api/recommend.js'
  import { createSong } from 'common/js/song'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      MusicList
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters(['disc'])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then(suc => {
          this.songs = this._nomailListSongs(suc.cdlist[0].songlist)
        }).catch(err => {
          console.log(err)
        })
      },
      _nomailListSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albumid) {
            getMusicAdsress(item.songmid).then(suc => {
              const vkey = suc.data.items[0].vkey
              ret.push(createSong(item, vkey, '117.34.59.20'))
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide.leave-to
    transform: translate3d(100%, 0, 0)
</style>

<template>
  <transition name="slide">
   <music-list :title="title" :rank="true" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list'
  import { getTopList } from 'api/rank'
  import { getMusicAdsress } from 'api/recommend'
  // import Rank from 'common/js/rank'
  import { createSong } from 'common/js/song'
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
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return this.topList.picUrl
      },
      ...mapGetters(['topList'])
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getTopList(this.topList.id).then(suc => {
          this.songs = this.__nomailListSongs(suc.songlist)
        })
      },
      __nomailListSongs(list) {
        let ret = []
        list.forEach((item) => {
          const data = item.data
          if (data.songid && data.albumid) {
            getMusicAdsress(data.songmid).then(suc => {
              const vkey = suc.data.items[0].vkey
              if (vkey) ret.push(createSong(data, vkey, '117.34.59.21'))
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
<style scoped lang="stylus" rel="stylesheet/stylus">
   .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide.leave-to
    transform: translate3d(100%, 0, 0) 
</style>

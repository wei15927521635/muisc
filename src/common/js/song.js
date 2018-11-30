import { getLyric } from 'api/song.js'
import { ERR_OK } from 'api/config.js'
import { Base64 } from 'js-base64'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url, albumdesc}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.albumdesc = albumdesc
  }
  _getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(suc => {
        if (suc.code === ERR_OK) {
          this.lyric = Base64.decode(suc.lyric)
          resolve(this.lyric)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const createSong = (musicData, key, ip) => {
  // console.log(key, 'key')
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://${ip}/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=2636247790&vkey=${key}&uin=0&fromtag=66`,
    albumdesc: musicData.albumdesc
  })
}
export const filterSinger = (singer) => {
  let ret = []
  if (!singer) return ''
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('·')
}
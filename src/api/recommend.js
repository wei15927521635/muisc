import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
/**
 * 轮播数据获取
 */
export const getRecommend = () => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
/**
 * 推荐歌单获取
 */
export const getDiscList = () => {
  let url = '/api/getDiscList'
  let data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}
/**
 * 获取歌曲地址
*/
export const getMusicAdsress = (mid) => {
  let url = '/api/music'
  let data = Object.assign({}, commonParams, {
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 2636247790,
    paltform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    cid: 205361747,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

export const getSongList = (disstid) => {
  let url = '/api/song'
  let data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(getcallback(res.data))
  }).catch(err => {
    console.log(err)
  })
}

function getcallback(ret) {
  let str
  if (typeof ret === 'string') {
    var reg = /^\w+\((.+)\)$/
    var mathes = ret.match(reg)
    str = JSON.parse(mathes[1])
  }
  return str
}

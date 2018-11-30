import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
/**
 * 获取歌手详情
*/
export const getHotKey = (singerId) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  let data = Object.assign({}, commonParams, {
    g_tk: 1345924530,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: Math.random()
  })
  return jsonp(url, data, options)
}

export const getSuggest = (query, page, zhida = true) => {
  let url = '/api/search'
  let data = Object.assign({}, commonParams, {
    g_tk: 1345924530,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: Math.random()
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
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// import axios from 'axios'
/**
 * 歌手数据获取
 */
export const getSingerList = () => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    paltform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}
/**
 * 获取歌手详情
*/
export const getSingerDetail = (singerId) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  let data = Object.assign({}, commonParams, {
    begin: 0,
    order: 'listen',
    num: 30,
    songstatus: 1,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    paltform: 'yqq',
    notice: 0,
    singermid: singerId,
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}

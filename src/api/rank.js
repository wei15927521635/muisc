import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export const getRankList = () => {
  // let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let data = Object.assign({}, commonParams, {
    // tpl: 3,
    // page: 'detail',
    // date: '2018_46',
    // topid: '29',
    // type: 'top',
    // song_begin: 0,
    // song_num: 30,
    // g_tk: 5381,
    // loginUin: 0,
    // hostUin: 0,
    // notice: 0,
    // platform: 'yqq',
    needNewCode: 1,
    platform: 'h5',
    g_tk: 67232076
  })

  return jsonp(url, data, options)
}
export const getTopList = (id) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let data = Object.assign({}, commonParams, {
    g_tk: 1372579585,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id,
    _: Math.random()
  })

  return jsonp(url, data, options)
}
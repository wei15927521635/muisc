import { commonParams } from './config'
import axios from 'axios'

export const getLyric = (mid) => {
  let url = '/api/lyric'
  let data = Object.assign({}, commonParams, {
    songmid: mid,
    paltform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    pcachetime: +new Date(),
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

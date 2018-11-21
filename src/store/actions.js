import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import shuffle from '../common/js/shuffle'
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LSIT, list) // 设置歌单播放器顺序列表
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list) // 设置歌单列表
  }
  commit(types.SET_CURRENT_INDEX, index) // 设置歌单列表当前播放内容

  commit(types.SET_FULL_SCREEN, true) // 设置歌单列表是否全屏

  commit(types.SET_PLAYING_STATE, true) // 设置播放器播放状态
}
export const randomPlay = ({commit}, {list}) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LSIT, list) // 设置歌单播放器顺序列表
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList) // 设置歌单列表
  commit(types.SET_CURRENT_INDEX, 0) // 设置歌单列表当前播放内容
  commit(types.SET_FULL_SCREEN, true) // 设置歌单列表是否全屏
  commit(types.SET_PLAYING_STATE, true) // 设置播放器播放状态
}
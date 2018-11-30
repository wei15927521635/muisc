import * as types from './mutation-types'
const matutaions = {
  // 设置歌手详情数据内容
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  // 设置播放器播放状态
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  // 设置歌单列表是否全屏
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  // 设置歌单列表
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  // 设置歌单播放器顺序列表
  [types.SET_SEQUENCE_LSIT](state, list) {
    state.sequenceList = list
  },
  // 设置歌单播放模式
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  // 设置歌单列表当前播放内容
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  // 设置热门推荐歌单
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, list) {
    state.topList = list
  }
}
export default matutaions
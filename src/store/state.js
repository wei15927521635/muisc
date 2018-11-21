import { playMode } from 'common/js/config'

const state = {
  singer: {}, // 歌手详情数据
  playing: false, // 播放器播放状态
  fullScreen: false, // 播放器是否全屏
  playList: [], // 播放器播放列表
  sequenceList: [], // 播放器顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放内容
}
export default state
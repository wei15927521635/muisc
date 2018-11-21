export const singer = state => state.singer // 歌手详情数据

export const playing = state => state.playing // 播放器播放状态

export const fullScreen = state => state.fullScreen // 播放器是否全屏

export const playList = state => state.playList // 播放器播放列表

export const sequenceList = state => state.sequenceList // 播放器顺序列表

export const mode = state => state.mode // 播放模式

export const currentIndex = state => state.currentIndex // 当前播放内容

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
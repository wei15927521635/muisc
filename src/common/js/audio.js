const playerCore = (el, url) => {
  let html =
    '<audio height="25" src="' + url + '" controls="controls" loop="loop">' +
      'Your browser does not support the audio element.' +
    '</audio>'
  el.innerHTML = html
  return html
}

export default class Audio {
  constructor({el}) {
    this.core = playerCore(el, 'http://ws.stream.qqmusic.qq.com/C100001Qu4I30eVFYb.m4a?fromtag=0&guid=0')
  }
}
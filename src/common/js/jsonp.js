import originJSONP from 'jsonp'
const jsonp = (url, data, ops) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, ops, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
const param = (data) => {
  let url = ''
  for (let k in data) {
    let val = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(val)}`
  }
  return url ? url.substring(1) : ''
}
export default jsonp
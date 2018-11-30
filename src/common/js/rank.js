export default class Rank {
  constructor({id, name, desc}) {
    this.id = id
    this.name = name
    this.desc = desc
    this.avatar = `https://y.gtimg.cn/music/photo_new/T002R90x90M000${id}.jpg?max_age=2592000`
  }
}
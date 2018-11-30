<template>
 <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>
<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      }
    },
    created() {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>
<style scoped>

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 35px;
    background: #fff;
    border-radius: 6px;
  }
  .icon-search {
    font-size: 24px;
    color: #aaa;
  }
  .box {
    flex: 1;
    /* margin: 0 5px; */
    line-height: 18px;
    padding: 2px 0;
    background: #fff;
    color: #858585;
    font-size: 14px;
    border: none;
    outline: none;
    box-shadow: none;
  }
  .search-box .box:focus {
    /* border-top: none;
    border-left: none ;
    border-right: none;
    border-bottom: 1px solid rgba(0,0,0,.3); */
  }
      
    /* &::placeholder
      color: #aaa */
  .icon-dismiss {
    font-size: 16px;
    color: #aaa;
  }
</style>
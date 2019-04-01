<template>
  <div class="chapter1">
    <h3>计数器</h3>
    <button @click="incrFn">+</button>
    <p>{{this.$store.state.count}}</p>
    <button>-</button>

    <ul class="list">
        <li v-for="(item,index) in listData" :key="index">
          <h3>{{item.name}}</h3>
          <input @input="getTotal" v-model="item.count">
        </li>
    </ul>

    <div class="total">{{total}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        listData: [
          {
            id:1,
            name: '11111',
            count: 0,
          },
          {
            id:2,
            name: '22222',
            count: 0,
          },
          {
            id:3,
            name: '3333',
            count: 0,
          },
        ],
        total: 0,
      }
    },
    computed: {

      count: {
        get: function () {
          return this.$store.state.count;
        },
        set: function (val) {
          this.$store.state.count = val;
        }
      }
    },
    created() {
      console.log('玩胜多负少');
      console.log(1111);
      console.log(222);
      console.log(333);
      console.log(45);
      console.log(33);
      console.log(6);
    },
    methods: {
      incrFn() {
        store.commit('increment')
      },
      getTotal() {
        var _this = this;
        this.listData.forEach(function (e,i) {
          _this.total += Number(e.count);
        })
        console.log(_this.total);
      }
    }
  }
</script>

<style lang='less' scoped='' type='text/css'>

</style>
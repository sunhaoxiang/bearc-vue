<template>
  <div>
    <h3 class="ma-b-25">国家</h3>
    <p class="country ma-b-15" :class="[activeIndex === item.countryId ? 'is-active' : '']" v-for="item in country" :key="item.countryId" @click="chooseCountry(item.countryId)">{{item.countryName}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // country: ['所有国家', '英国', '德国', '美国', '澳大利亚'],
      country: [
        {
          countryId: 0,
          countryName: '所有国家'
        },
        {
          countryId: 1,
          countryName: '英国'
        },
        {
          countryId: 3,
          countryName: '德国'
        },
        {
          countryId: 4,
          countryName: '美国'
        },
        {
          countryId: 2,
          countryName: '日本'
        }
      ],
      activeIndex: 0  // 默认选中所有国家
    }
  },
  methods: {
    chooseCountry (id) {
      this.activeIndex = id
    }
  }
}
</script>

<style scoped lang="scss">
.country {
  transition: padding .5s;
  cursor: pointer;
  &:hover{
    border-left: 2px solid #2d8cf0;
    padding-left: 15px;
    color: #2d8cf0;
  }
}
.is-active {
  border-left: 2px solid #2d8cf0;
  padding-left: 15px;
  color: #2d8cf0;
}
</style>

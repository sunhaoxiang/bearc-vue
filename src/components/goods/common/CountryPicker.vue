<template>
  <div>
    <h3 class="ma-b-25">国家</h3>
    <p class="country ma-b-15" :class="{'is-active': activeName === '所有国家'}" @click="chooseCountry('所有国家')">所有国家</p>
    <p class="country ma-b-15" :class="{'is-active': activeName === item.country}" v-for="item in country" :key="item._id" @click="chooseCountry(item.country)">{{item.country}}</p>
  </div>
</template>

<script>
import { getCountries } from '@/axios/axios.js'

export default {
  props: {
    activeName: {
      type: String
    }
  },
  data () {
    return {
      country: []
    }
  },
  methods: {
    chooseCountry (name) {
      this.$emit('update:activeName', name)
    },
    async getCountryAsync () {
      try {
        let res = await getCountries()
        this.country = res.data.result.list
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getCountryAsync()
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
  font-weight: bold;
}
</style>

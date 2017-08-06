<template>
  <div>
    <h3 class="ma-b-25">国家</h3>
    <p class="country ma-b-15" :class="[activeIndex === item.countryId ? 'is-active' : '']" v-for="item in country" :key="item.countryId" @click="chooseCountry(item.countryId)">{{item.countryName}}</p>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      country: []
    }
  },
  methods: {
    chooseCountry (id) {
      this.$emit('update:activeIndex', id)
    }
  },
  created () {
    this.$http.get('https://www.easy-mock.com/mock/5986c047a1d30433d8566e7e/bearc-vue/getCountry')
      .then((res) => {
        this.country = res.data
      })
      .catch((err) => {
        console.log(err)
      })
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

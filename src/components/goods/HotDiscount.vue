<template>
  <div>
    <Row :gutter="10">
      <Col :sm="12" :md="8" :lg="6" v-for="item in dataListByCountry" :key="item.id">
        <Item-card :itemData="item"></Item-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ItemCard from './common/ItemCard'

export default {
  props: {
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    dataListByCountry () {
      let data = []
      if (this.activeIndex === 0) {
        data = this.dataList
      } else {
        data = this.dataList.filter((ele) => {
          return ele.countryId === this.activeIndex
        })
      }
      return data
    }
  },
  created () {
    this.$http.get('https://www.easy-mock.com/mock/5986c047a1d30433d8566e7e/bearc-vue/getHotdiscount')
      .then((res) => {
        this.dataList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: {
    ItemCard
  }
}
</script>

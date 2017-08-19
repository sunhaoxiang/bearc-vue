<template>
  <div>
    <Row :gutter="10">
      <Col :sm="12" :md="8" :lg="6" v-for="item in dataListByCountry" :key="item._id">
        <item-card :itemData="item"></item-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ItemCard from '../common/ItemCard'

export default {
  props: {
    activeName: {
      type: String
    }
  },
  data () {
    return {
      goodsList: []
    }
  },
  computed: {
    dataListByCountry () {
      if (this.activeName === '所有国家') {
        return this.goodsList
      } else {
        return this.goodsList.filter((ele) => {
          return ele.productCountry === this.activeName
        })
      }
    }
  },
  methods: {
    getGoodsList () {
      this.$http.get('getgoods/cosmetics')
        .then((res) => {
          this.goodsList = res.data.result.list
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getGoodsList()
  },
  components: {
    ItemCard
  }
}
</script>

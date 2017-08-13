<template>
  <div>
    <Row :gutter="10">
      <Col :sm="12" :md="8" :lg="6" v-for="item in dataListByCountry" :key="item.id">
        <item-card :itemData="item"></item-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ItemCard from '../common/ItemCard'

export default {
  props: {
    activeIndex: {
      type: Number
    }
  },
  data () {
    return {
      goodsList: []
    }
  },
  computed: {
    dataListByCountry () {
      if (this.activeIndex === 0) {
        return this.goodsList
      } else {
        return this.goodsList.filter((ele) => {
          return ele.countryId === this.activeIndex
        })
      }
    }
  },
  methods: {
    getHotdiscount () {
      this.$http.get('getHotdiscount')
        .then((res) => {
          this.goodsList = res.data.result
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getHotdiscount()
  },
  components: {
    ItemCard
  }
}
</script>

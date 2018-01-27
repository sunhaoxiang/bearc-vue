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
import { getHealthProducts } from '@/axios'

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
      if (this.activeName === 'allCountries') {
        return this.goodsList
      } else {
        return this.goodsList.filter((ele) => {
          return ele.productCountry === this.activeName
        })
      }
    }
  },
  methods: {
    async getHealthProductsAsync () {
      try {
        let res = await getHealthProducts()
        this.goodsList = res.data.result.list
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getHealthProductsAsync()
  },
  components: {
    ItemCard
  }
}
</script>

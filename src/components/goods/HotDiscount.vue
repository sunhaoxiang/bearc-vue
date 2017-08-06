<template>
  <div>
    <Row :gutter="10">
      <Col :sm="12" :md="8" :lg="6" v-for="item in itemData" :key="item.id">
        <Item-card :itemData="item"></Item-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ItemCard from './common/ItemCard'

export default {
  data () {
    return {
      itemData: [
      ]
    }
  },
  created () {
    this.$http.get('https://www.easy-mock.com/mock/5986c047a1d30433d8566e7e/bearc-vue/getHotdiscount')
      .then((res) => {
        this.itemData = res.data
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

<style scoped lang="scss">

</style>

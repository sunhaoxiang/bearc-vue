<template>
  <div>
    <Row :gutter="10">
      <Col :sm="12" :md="8" :lg="6">
        <Item-card></Item-card>
      </Col>
      <Col :sm="12" :md="8" :lg="6">
        <Item-card></Item-card>
      </Col>
      <Col :sm="12" :md="8" :lg="6">
        <Item-card></Item-card>
      </Col>
      <Col :sm="12" :md="8" :lg="6">
        <Item-card></Item-card>
      </Col>
      <Col :sm="12" :md="8" :lg="6">
        <Item-card></Item-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ItemCard from './common/ItemCard'

export default {
  data () {
    return {

    }
  },
  components: {
    ItemCard
  }
}
</script>

<style scoped lang="scss">

</style>

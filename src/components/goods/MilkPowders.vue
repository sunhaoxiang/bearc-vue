<template>
  <div>
    <Row :gutter="20">
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
        <Item-card></Item-card>
      </Col>
      <Col span="6">
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

<style>

</style>

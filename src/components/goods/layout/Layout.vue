<template>
  <div>
    <!-- 热门，奶粉，辅食，宝宝用品，面膜，护肤，彩妆，洗护，饰品 -->
    <Nav-header></Nav-header>
    <div class="body-wapper pa-t-60">
      <Row>
        <Col :sm="{span: 5, offset: 1}" :md="{span: 4, offset: 2}" :lg="{span: 4, offset: 2}">
          <Country-picker :activeIndex.sync="activeIndex"></Country-picker>
        </Col>
        <Col :sm="{span: 17}" :md="{span: 16}" :lg="{span: 16}">
          <transition name="fade" mode="out-in">
            <router-view :activeIndex="activeIndex"></router-view>
          </transition>
        </Col>
      </Row>
    </div>
    <Nav-footer></Nav-footer>
  </div>
</template>

<script>
import NavHeader from './NavHeader'
import NavFooter from './NavFooter'
import CountryPicker from '../common/CountryPicker'

export default {
  name: 'layout',
  components: {
    NavHeader,
    NavFooter,
    CountryPicker
  },
  data () {
    return {
      activeIndex: 0
    }
  }
}
</script>

<style scoped lang="scss">
.body-wapper {
  background: #f5f7fc;
  min-height: 700px;
}
</style>

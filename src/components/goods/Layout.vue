<template>
  <div>
    <!-- 热门，奶粉，辅食，宝宝用品，面膜，护肤，彩妆，洗护，饰品 -->
    <Nav-header></Nav-header>
    <div class="body-wapper pa-t-60">
      <Row>
        <Col span="4" offset="2">
          <Country-picker></Country-picker>
        </Col>
        <Col span="16">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import NavHeader from './NavHeader'
import CountryPicker from './common/CountryPicker'

export default {
  name: 'layout',
  components: {
    NavHeader,
    CountryPicker
  },
  data () {
    return {
    }
  }
}
</script>

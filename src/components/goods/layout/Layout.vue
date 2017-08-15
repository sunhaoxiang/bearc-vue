<template>
  <div>
    <nav-header :activeName="routeName"></nav-header>
    <transition name="fade" mode="out-in">
      <Row v-if="routeName === 'Hot'">
        <Col span="24">
          <Carousel autoplay :autoplay-speed="3000" v-model="bannerDefault">
            <Carousel-item>
              <div class="banner">1</div>
            </Carousel-item>
            <Carousel-item>
              <div class="banner">2</div>
            </Carousel-item>
            <Carousel-item>
              <div class="banner">3</div>
            </Carousel-item>
            <Carousel-item>
              <div class="banner">4</div>
            </Carousel-item>
          </Carousel>
        </Col>
      </Row>
    </transition>
    <Row class="body-wrapper pa-t-60">
      <Col :sm="{span: 5, offset: 1}" :md="{span: 4, offset: 2}" :lg="{span: 4, offset: 2}">
        <country-picker :activeName.sync="activeName"></country-picker>
      </Col>
      <Col :sm="{span: 17}" :md="{span: 16}" :lg="{span: 16}">
        <transition name="fade" mode="out-in">
          <router-view :activeName="activeName"></router-view>
        </transition>
      </Col>
    </Row>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from './NavHeader'
import NavFooter from './NavFooter'
import CountryPicker from '../common/CountryPicker'

export default {
  name: 'layout',
  data () {
    return {
      routeName: '',
      bannerDefault: 0,
      activeName: '所有国家'
    }
  },
  watch: {
    $route (val, oldVal) {
      this.routeName = val.name
    }
  },
  created () {
    this.routeName = this.$route.name
  },
  components: {
    NavHeader,
    NavFooter,
    CountryPicker
  }
}
</script>

<style scoped lang="scss">
.banner {
  height: 400px;
  line-height: 400px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>

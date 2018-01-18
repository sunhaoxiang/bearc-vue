<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="goodslist">
            <Icon type="ios-list"></Icon>
            商品列表
          </MenuItem>
          <MenuItem name="goodstype">
            <Icon type="ios-pricetags"></Icon>
            分类列表
          </MenuItem>
        </Menu>
      </Col>
      <Col class="pa-t-20" span="20">
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routeName: ''
    }
  },
  methods: {
    selectMenu (name) {
      this.$router.push(`/${this.$route.matched[1].name}/${name}`)
    }
  },
  watch: {
    $route (val, oldVal) {
      this.routeName = val.matched[2].name
    }
  },
  created () {
    this.routeName = this.$route.matched[2].name
  }
}
</script>

<style>

</style>

<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="goodslist">
            <Icon type="ios-list"></Icon>
            商品列表
          </MenuItem>
          <MenuItem name="addgoods">
            <Icon type="ios-compose"></Icon>
            商品添加
          </MenuItem>
          <MenuItem name="hotgoods">
            <Icon type="ios-flame"></Icon>
            热门商品
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
      this.$router.push(`/admin/${this.$route.matched[1].name}/${name}`)
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

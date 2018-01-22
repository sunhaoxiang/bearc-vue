<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="earninglist">
            <Icon type="social-usd"></Icon>
            收入列表
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

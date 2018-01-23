<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="earningslist">
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
import module from '@/mixin/module.js'

export default {
  mixins: [
    module
  ]
}
</script>

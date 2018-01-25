<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="modifypassword">
            <Icon type="ios-gear"></Icon>
            修改密码
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

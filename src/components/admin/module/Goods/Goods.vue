<template>
  <div>
    <Row>
      <Col span="4">
        <Menu class="body-min-height" theme="light" :active-name="routeName" @on-select="selectMenu">
          <MenuItem name="goodslist">
            <Icon type="ios-list"></Icon>
            商品列表
          </MenuItem>
          <MenuItem name="typeslist">
            <Icon type="ios-pricetags"></Icon>
            分类列表
          </MenuItem>
          <MenuItem name="countrieslist">
            <Icon type="earth"></Icon>
            国家列表
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

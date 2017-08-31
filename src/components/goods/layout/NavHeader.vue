<template>
  <div>
    <Row>
      <Col :sm="{span: 5, offset: 1}" :md="{span: 4, offset: 2}" :lg="{span: 4, offset: 2}">
        logo
      </Col>
      <Col :sm="{span: 17}" :md="{span: 16}" :lg="{span: 16}">
        <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="selectMenu">
            <Menu-item name="hot">
              热门
            </Menu-item>
            <Menu-item name="milkpowders">
              奶粉
            </Menu-item>
            <Menu-item name="babyfoods">
              辅食
            </Menu-item>
            <Menu-item name="babyarticles">
              宝宝用品
            </Menu-item>
            <Menu-item name="masks">
              面膜
            </Menu-item>
            <Menu-item name="creams">
              护肤
            </Menu-item>
            <Menu-item name="cosmetics">
              彩妆
            </Menu-item>
            <Menu-item name="mildywashes">
              洗护
            </Menu-item>
            <Menu-item name="healthproducts">
              保健
            </Menu-item>
            <Menu-item name="accessories">
              饰品
            </Menu-item>
        </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String
    }
  },
  methods: {
    selectMenu (name) {
      this.$router.push(name)
    }
  }
}
</script>

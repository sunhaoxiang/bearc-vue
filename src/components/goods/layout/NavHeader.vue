<template>
  <div>
    <Row>
      <Col :sm="{span: 5, offset: 1}" :md="{span: 4, offset: 2}" :lg="{span: 4, offset: 2}">
        logo
      </Col>
      <Col :sm="{span: 17}" :md="{span: 16}" :lg="{span: 16}">
        <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="selectMenu">
            <Menu-item name="Hot">
              热门
            </Menu-item>
            <Menu-item name="MilkPowder">
              奶粉
            </Menu-item>
            <Menu-item name="BabyFoods">
              辅食
            </Menu-item>
            <Menu-item name="BabyArticles">
              宝宝用品
            </Menu-item>
            <Menu-item name="Masks">
              面膜
            </Menu-item>
            <Menu-item name="Creams">
              护肤
            </Menu-item>
            <Menu-item name="Cosmetics">
              彩妆
            </Menu-item>
            <Menu-item name="MildyWashes">
              洗护
            </Menu-item>
            <Menu-item name="Accessories">
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

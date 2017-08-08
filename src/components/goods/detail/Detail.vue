<template>
  <div>
    <Row>
      <Col :sm="{span: 5, offset: 1}" :md="{span: 4, offset: 2}" :lg="{span: 4, offset: 2}">
        logo
      </Col>
      <Col :sm="{span: 17}" :md="{span: 16}" :lg="{span: 16}">
        <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="selectMenu">
            <Menu-item name="hotdiscount">
              热门
            </Menu-item>
            <Menu-item name="milkpowder">
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
            <Menu-item name="accessories">
              饰品
            </Menu-item>
        </Menu>
      </Col>
    </Row>
    <Row class="body-wrapper pa-t-20">
      <Col :sm="{span: 22, offset: 1}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}">
        <Card shadow>
          <Row>
            <Col span="10">11</Col>
            <Col span="14">22</Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Nav-footer></Nav-footer>
  </div>
</template>

<script>
import NavFooter from '../layout/NavFooter'

export default {
  name: 'detail',
  data () {
    return {
      activeName: ''
    }
  },
  methods: {
    selectMenu (name) {
      this.$router.push(`/${name}`)
    }
  },
  created () {
    console.log(this.$route.params.id)
  },
  components: {
    NavFooter
  }
}
</script>

<style>

</style>

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
     <Row class="body-wrapper pa-t-20">
      <Col :sm="{span: 22, offset: 1}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}">
        <Card shadow class="card">
          <Row>
            <Col :xs="24" :sm="10" :md="10" :lg="10">
              <img class="detail-pic" src="http://oj7f77hgk.bkt.clouddn.com/test-1.jpeg" alt="">
            </Col>
            <Col :xs="24" :sm="14" :md="14" :lg="14">
              <h2 class="title">标题标题标题标题</h2>
              <h3 class="price-wrapper">
                <span class="title">价格：</span>
                <span class="price">￥ 30.00</span>
              </h3>
              <h3 class="text-wrapper">
                <span class="title">国家：</span>
                <span class="country">英国</span>
              </h3>
              <h3 class="text-wrapper">
                <span class="title">简介：</span>
                <span class="intro">12343245345345</span>
              </h3>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row> 
    <nav-footer></nav-footer>
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

<style scoped lang="scss">
@media screen and (min-width: 1561px) {
  .detail-pic {
    width: 500px;
    height: 500px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 100px;
  }
  .text-wrapper {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1441px) and (max-width: 1560px) {
  .detail-pic {
    width: 450px;
    height: 450px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 100px;
  }
  .text-wrapper {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1321px) and (max-width: 1440px) {
  .detail-pic {
    width: 400px;
    height: 400px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 80px;
  }
  .text-wrapper {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1320px) {
  .detail-pic {
    width: 350px;
    height: 350px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 60px;
  }
  .text-wrapper {
    margin-top: 20px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .detail-pic {
    width: 300px;
    height: 300px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 60px;
  }
  .text-wrapper {
    margin-top: 15px;
  }
}
@media screen and (max-width: 991px) {
  .detail-pic {
    width: 250px;
    height: 250px;
    border: 1px solid #dddee1;
  }
  .price-wrapper {
    margin-top: 40px;
  }
  .text-wrapper {
    margin-top: 10px;
  }
}
.title {
  color: #1c2438;
}
.price {
  color: #ed3f14;
}
.country {
   color: #495060;
}
.intro {
  font-weight: normal;
  color: #495060;
}
</style>

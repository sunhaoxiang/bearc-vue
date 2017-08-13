<template>
  <div>
    <Card class="card ma-b-20" :padding="10">
      <img class="img center" v-lazy="itemData.goodsImgSrc" :alt="itemData.goodsName">
      <h4 class="title">{{itemData.goodsName}}</h4>
      <h3 class="price ma-t-25">
        <span v-if="itemData.goodsDiscountPrice"> ￥ {{itemData.goodsDiscountPrice}}</span>
        <span :class="{'discount': itemData.goodsDiscountPrice}">￥ {{itemData.goodsPrice}}</span>
      </h3>
      <p class="country ma-t-10">{{itemData.countryName}}</p>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1321px) {
  .img {
    width: 200px;
    height: 200px;
  }
  .title {
    margin-top: 10px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1320px) {
  .img {
    width: 180px;
    height: 180px;
  }
  .title {
    margin-top: 30px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .img {
    width: 200px;
    height: 200px;
  }
  .title {
    margin-top: 10px;
  }
}
@media screen and (max-width: 991px) {
  .img {
    width: 200px;
    height: 200px;
  }
  .title {
    margin-top: 10px;
  }
}
.card {
  transition: .5s;
  cursor: pointer;
  height: 350px;
  .img {
    display: block;
    margin: 0 auto;
  }
  .price {
    color: #ed3f14;
  }
  .discount {
    color: #80848f;
    font-size: 12px;
    text-decoration: #80848f line-through;
  }
  .country {
    color: #80848f;
  }
}
</style>

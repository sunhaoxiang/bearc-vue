<template>
  <div>
    <Card class="card ma-b-20" :padding="10">
      <img class="img" src="../../../assets/img/1.jpg" alt="">
      <h4 class="ma-t-10">自拍杆</h4>
      <h3 class="price ma-t-25">￥ 50.00</h3>
      <p class="country ma-t-10">日本</p>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  transition: .5s;
  cursor: pointer;
  height: 350px;
  .img {
    text-align: center;
    width: 200px;
    height: 200px;
  }
  .price {
    color: #ed3f14;
  }
  .country {
    color: #80848f;
  }
}
</style>

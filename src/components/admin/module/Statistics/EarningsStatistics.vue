<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="ios-pulse-strong"></Icon>
        收入统计
      </h2>
      <Form ref="form" :model="form" :rules="rule" inline>
        <FormItem prop="date">
          <DatePicker type="daterange" v-model="form.date" @on-change="dateChangeHandler" size="large" placeholder="请选择时间范围" style="width: 300px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" @click="search">查 询</Button>
        </FormItem>
      </Form>
      <div class="text">
        <div>{{dateFormat[0]}} 到 {{dateFormat[1]}} 期间收入为：</div>
        <div class="price-wrap"><span class="price" ref="earningsCount"></span> 元</div>
      </div>
      <div ref="chart"></div>
    </Card>
  </div>
</template>

<script>
// import moment from 'moment'
import CountUp from 'countup.js'
import G2 from '@antv/g2'
// import DataSet from '@antv/data-set'

export default {
  data () {
    return {
      form: {
        date: ['', '']
      },
      rule: {},
      dateFormat: ['', ''],
      CountUpObj: null,
      chart: null,
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ]
    }
  },
  methods: {
    search () {
      this.init()
    },
    init () {
      this.CountUpObj = new CountUp(this.$refs.earningsCount, 0, 5678.6, 1, 1)
      this.CountUpObj.start()
      if (this.chart) {
        this.chart.destroy()
      }
      this.chart = new G2.Chart({
        container: this.$refs.chart, // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300 // 指定图表高度
      })
      this.chart.source(this.data)
      this.chart.interval().position('genre*sold').color('genre')
      this.chart.render()
    },
    dateChangeHandler (val) {
      this.dateFormat = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .text {
    font-size: 20px;
    text-align: center;
    .price-wrap {
      font-size: 36px;
      font-weight: bold;
      .price {
        color: #ed3f14;
      }
    }
  }
</style>

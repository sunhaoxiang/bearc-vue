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
          <Button type="primary" size="large" :loading="loading" @click="search">查 询</Button>
        </FormItem>
      </Form>
      <div v-show="showResult" class="text">
        <div class="ma-b-10">{{dateFormat[0]}} 到 {{dateFormat[1]}} 期间收入统计：</div>
        <div class="price-wrap">交易 <span class="price" ref="totalCount"></span> 笔，收入 <span class="price" ref="earningsCount"></span> 元，利润 <span class="price" ref="profitsCount"></span> 元</div>
      </div>
      <div v-show="showResult" ref="chart" class="chart"></div>
    </Card>
  </div>
</template>

<script>
// import moment from 'moment'
import CountUp from 'countup.js'
import G2 from '@antv/g2'
import { earningsStatistics } from '@/axios'
// import { View } from '@antv/data-set'

export default {
  data () {
    return {
      form: {
        date: ['', '']
      },
      rule: {},
      dateFormat: ['', ''],
      total: 0,
      earnings: 0,
      profits: 0,
      totalCountUpObj: null,
      earningsCountUpObj: null,
      profitsCountUpObj: null,
      chart: null,
      chartData: [],
      showResult: false,
      loading: false
    }
  },
  methods: {
    async StatisticsAsync () {
      this.loading = true
      try {
        let res = await earningsStatistics({
          startDate: this.form.date[0],
          endDate: this.form.date[1]
        })
        this.loading = false
        if (res.data.result.count === 0) return
        this.showResult = true
        this.total = res.data.result.count
        this.sumHandler(res.data.result.list)
        this.chartInitHandler(res.data.result.list)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    search () {
      this.StatisticsAsync()
    },
    sumHandler (list) {
      let sumEarning = 0
      let sumProfit = 0
      for (let i = 0; i < list.length; i++) {
        sumEarning += list[i].productPrice * list[i].sellNumber
        sumProfit += (list[i].productPrice * list[i].sellNumber * 10 - list[i].purchasePrice * list[i].sellNumber * 10 - list[i].expressFee * 10) / 10
      }
      this.earnings = sumEarning
      this.profits = sumProfit
    },
    chartInitHandler (list) {
      // 数字统计
      this.totalCountUpObj = new CountUp(this.$refs.totalCount, 0, this.total, 0, 1)
      this.earningsCountUpObj = new CountUp(this.$refs.earningsCount, 0, this.earnings, 1, 1)
      this.profitsCountUpObj = new CountUp(this.$refs.profitsCount, 0, this.profits, 1, 1)
      this.totalCountUpObj.start()
      this.earningsCountUpObj.start()
      this.profitsCountUpObj.start()

      // 图表
      let arr = this.$local.uniqueArray(list.map(e => e.productName))
      let chartDataTemp = arr.map(e => {
        return {
          name: e,
          count: 0
        }
      })
      chartDataTemp.map(e => {
        list.map(f => {
          if (e.name === f.productName) {
            e.count += f.sellNumber
          }
        })
      })
      this.chartData = chartDataTemp
      console.log(this.chartData)
      if (this.chart) {
        this.chart.destroy()
      }
      this.chart = new G2.Chart({
        container: this.$refs.chart,
        padding: [ 80, 80, 80, 80 ],
        forceFit: true
      })
      this.chart.source(this.chartData)
      this.chart.coord('theta')
      this.chart.tooltip({
        showTitle: false
      })
      this.chart.intervalStack()
        .position('count')
        .color('name')
        .label('name', {
          formatter: (text, item, index) => {
            const point = item.point
            return `${text} - ${point.count}件 `
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
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
      font-size: 20px;
      font-weight: bold;
      .price {
        color: #ed3f14;
      }
    }
  }
  .chart {
    width: 600px;
    height: 600px;
    margin: 0 auto;
  }
</style>

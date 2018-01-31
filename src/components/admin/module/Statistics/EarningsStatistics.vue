<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="ios-pulse-strong"></Icon>
        收入统计
      </h2>
      <Form ref="form" :model="form" :rules="rule" inline>
        <FormItem prop="date">
          <DatePicker type="daterange" v-model="form.date" :options="dateOptions" @on-change="dateChangeHandler" size="large" placeholder="请选择时间范围" style="width: 300px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" :loading="loading" @click="search('form')">查 询</Button>
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
import Cookies from 'js-cookie'
import CountUp from 'countup.js'
import G2 from '@antv/g2'
import { earningsStatistics } from '@/axios'

export default {
  data () {
    const validateDate = (rule, value, callback) => {
      if (value[0] === '' || value[1] === '') {
        callback(new Error('请先选择日期'))
      } else {
        callback()
      }
    }
    return {
      form: {
        date: ['', '']
      },
      rule: {
        date: [{ validator: validateDate, trigger: 'change' }]
      },
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
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
        this.statusHandler(res)
        // if (res.data.result.count === 0) {
        //   this.$Message.warning('没有查找到数据')
        //   this.showResult = false
        //   return
        // }
        this.total = res.data.result.count
        this.sumHandler(res.data.result.list)
        this.chartInitHandler(res.data.result.list)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    search (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.StatisticsAsync()
        } else {
          this.$Message.error('请先选择日期')
        }
      })
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
    },
    statusHandler (res) {
      switch (res.data.status) {
        case -1: // 验证成功，但出错
          this.$Message.error(res.data.msg)
          break
        case 0: // 验证成功
          if (res.data.result.count === 0) {
            this.showResult = false
            this.$Message.warning('没有查找到数据')
            return
          } else {
            this.showResult = true
          }
          break
        case 1: // 验证成功，但需要更新token
          Cookies.set('bearcToken', res.data.result.newToken)
          if (res.data.result.count === 0) {
            this.showResult = false
            this.$Message.warning('没有查找到数据')
            return
          } else {
            this.showResult = true
          }
          break
        case 401: // token无效
          this.$router.push('/login')
          this.$Message.error(res.data.msg)
          break
        case 500: // 服务器错误
          this.$Message.error(res.data.msg)
          break
        default: // 未知错误
          this.$router.push('/login')
          this.$Message.error(res.data.msg)
          break
      }
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

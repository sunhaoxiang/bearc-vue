<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 class="ma-b-20"><Icon type="calendar"></Icon> 历史上的今天</h2>
      <p>{{todayInHistoryTitle}}<Button type="text" icon="ios-search">查看详情</Button></p>
      <Spin size="large" fix v-if="todayInHistoryLoading"></Spin>
    </Card>
  </div>
</template>

<script>
import { todayInHistoryRandom } from '@/axios/axios.js'

export default {
  data () {
    return {
      todayInHistory: {
        date: '',
        title: '',
        e_id: ''
      },
      todayInHistoryLoading: true
    }
  },
  computed: {
    todayInHistoryTitle () {
      return this.todayInHistory.e_id ? `${this.todayInHistory.date}，${this.todayInHistory.title}` : ''
    }
  },
  mounted () {
    this.randomTIHAsync()
  },
  methods: {
    async randomTIHAsync () {
      try {
        let res = await todayInHistoryRandom()
        this.todayInHistory.date = res.data.result.date
        this.todayInHistory.title = res.data.result.title
        this.todayInHistory.e_id = res.data.result.e_id
        this.todayInHistoryLoading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>

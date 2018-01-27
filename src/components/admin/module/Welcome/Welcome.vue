<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 class="ma-b-20"><Icon type="calendar"></Icon> 历史上的今天</h2>
      <p>{{todayInHistoryTitle}}</p>
      <Spin size="large" fix v-if="TIHLoading"></Spin>
    </Card>
  </div>
</template>

<script>
import { todayInHistoryRandom } from '@/axios'

export default {
  data () {
    return {
      todayInHistory: {
        date: '',
        title: '',
        e_id: ''
      },
      TIHLoading: false // 历史上的今天标题loading
    }
  },
  computed: {
    todayInHistoryTitle () {
      return this.todayInHistory.e_id ? `${this.todayInHistory.date}，${this.todayInHistory.title}` : ''
    }
  },
  created () {
    this.randomTIHAsync()
  },
  methods: {
    async randomTIHAsync () {
      this.TIHLoading = true
      try {
        let res = await todayInHistoryRandom()
        this.todayInHistory.date = res.data.result.date
        this.todayInHistory.title = res.data.result.title
        this.todayInHistory.e_id = res.data.result.e_id
        this.TIHLoading = false
      } catch (err) {
        this.TIHLoading = false
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>

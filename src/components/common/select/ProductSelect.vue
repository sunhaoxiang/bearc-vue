<template>
  <Select
    v-model="valueSelf" 
    @on-change="changeHandler"
    :placeholder="placeholder"
    :clearable="clearable"
    :filterable="filterable"
    :disabled="disabled">
    <Option v-for="item in list" :value="item.value" :key="item.value">
      {{item.label}}
    </Option>
  </Select>
</template>

<script>
import { goodsList } from '@/axios/axios.js'
import select from '@/mixin/select.js'

export default {
  mixins: [
    select
  ],
  methods: {
    async optionsAsync () {
      try {
        let res = await goodsList()
        this.list = res.data.result.list.map(e => {
          return {
            value: e.productName,
            label: e.productName
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

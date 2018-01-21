<template>
  <Select
    v-model="valueSelf" 
    @on-change="changeHandler"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled">
    <Option v-for="item in typesList" :value="item.value" :key="item.value">
      {{item.label}}
    </Option>
  </Select>
</template>

<script>
import { countriesList } from '@/axios/axios.js'
import select from '@/mixin/select.js'

export default {
  mixins: [
    select
  ],
  methods: {
    async optionsAsync () {
      try {
        let res = await countriesList()
        this.typesList = res.data.result.list.map(e => {
          return {
            value: e.country,
            label: e.country
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

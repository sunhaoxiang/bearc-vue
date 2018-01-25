export default {
  props: {
    // 绑定值
    value: {
      type: String,
      default: ''
    },
    // 选择框默认文字
    placeholder: {
      type: String,
      default: ''
    },
    // 可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueSelf: '',
      list: []
    }
  },
  watch: {
    value (val) {
      this.valueSelf = val
    }
  },
  created () {
    this.optionsAsync()
  },
  methods: {
    changeHandler () {
      this.$emit('input', this.valueSelf)
    }
  }
}

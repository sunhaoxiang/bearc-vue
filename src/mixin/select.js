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
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueSelf: '',
      typesList: []
    }
  },
  watch: {
    value (val) {
      this.valueSelf = val
    }
  },
  mounted () {
    this.optionsAsync()
  },
  methods: {
    changeHandler () {
      this.$emit('input', this.valueSelf)
    }
  }
}

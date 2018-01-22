import Cookies from 'js-cookie'

export default {
  data () {
    return {
      tBody: [], // 表格data
      tLoading: false, // 表格loading
      isModalShow: false, // modal显示
      modalType: '' // modal类型
    }
  },
  computed: {
    // 动态计算modal的标题
    modalTitle () {
      return this.modalType === 'new' ? '添加' : '修改'
    }
  },
  created () {
    // 请求列表数据
    this.listAsync()
  },
  methods: {
    // 提交新增和修改
    modalSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isModalShow = false
          if (this.modalType === 'edit') {
            this.modifyAsync()
          } else if (this.modalType === 'new') {
            this.addAsync()
          }
        } else {
          this.$Message.error('请先填写表单')
        }
      })
      this.$Modal.remove()
    },
    // 提交删除
    modalRemove (index) {
      this.$Modal.confirm({
        title: '删除',
        content: '<p>确定删除吗？</p>',
        onOk: () => {
          this.removeAsync(index)
        }
      })
    },
    // 查询的status
    listStatusHandler (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.tBody = res.data.result.list
          this.tLoading = false
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.tBody = res.data.result.list
          this.tLoading = false
          break
        // 验证失败
        default:
          this.$router.push('/login')
          break
      }
    },
    // 添加、修改、删除的status
    actionStatusHandler (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.$Message.success(res.data.msg)
          this.listAsync()
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          this.listAsync()
          break
        // 验证失败
        default:
          this.$router.push('/login')
          this.$Message.error(res.data.msg)
          break
      }
    }
  }
}

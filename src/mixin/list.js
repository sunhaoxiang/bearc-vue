import Cookies from 'js-cookie'

export default {
  data () {
    return {
      tBody: [], // 表格data
      tLoading: false, // 表格loading
      page: { // 分页
        current: 1,
        size: 10,
        total: 0
      },
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
        case -1: // 验证成功，但出错
          this.$Message.error(res.data.msg)
          break
        case 0: // 验证成功
          if (res.data.result.list.length === 0 && this.page.current !== 1) {
            this.page.current--
            this.listAsync()
          } else {
            this.tBody = res.data.result.list
            this.page.total = res.data.result.count
          }
          this.tLoading = false
          break
        case 1: // 验证成功，但需要更新token
          Cookies.set('bearcToken', res.data.result.newToken)
          if (res.data.result.list.length === 0 && this.page.current !== 1) {
            this.page.current--
            this.listAsync()
          } else {
            this.tBody = res.data.result.list
            this.page.total = res.data.result.count
          }
          this.tLoading = false
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
    },
    // 添加、修改、删除的status
    actionStatusHandler (res) {
      switch (res.data.status) {
        case -1: // 验证成功，但出错
          this.$Message.error(res.data.msg)
          break
        case 0: // 验证成功
          this.$Message.success(res.data.msg)
          this.listAsync()
          break
        case 1: // 验证成功，但需要更新token
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          this.listAsync()
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
    },
    pageChangeHandler (current) {
      this.page.current = current
      this.listAsync()
    }
  }
}

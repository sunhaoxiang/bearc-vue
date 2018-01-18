<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAddType">
          <Icon type="ios-compose-outline"></Icon>
          添加分类
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModalType" :model="formModalType" :rules="ruleModalType" :label-width="80">
        <FormItem label="分类" prop="type">
          <Input v-model="formModalType.type" placeholder="请输入分类"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalTypeSubmit('formModalType')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { typesList, addType, modifyType, removeType } from '@/axios/axios.js'

export default {
  data () {
    return {
      tHeader: [
        {
          title: '分类',
          key: 'type',
          width: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalmodifyType(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modalremoveType(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tBody: [],
      tLoading: false,
      isModalShow: false,
      modalType: '',
      formModalType: {
        _id: '',
        type: ''
      },
      ruleModalType: {
        type: [{ required: true, message: '分类名不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    modalTitle () {
      return this.modalType === 'new' ? '添加分类' : '修改分类'
    }
  },
  created () {
    this.typesListAsync()
  },
  methods: {
    async typesListAsync () {
      try {
        this.tLoading = true
        let res = await typesList({
          token: Cookies.get('bearcToken')
        })
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
        // this.handleStatus(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addTypeAsync () {
      try {
        let res = await addType({
          type: this.formModalType.type,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyTypeAsync () {
      try {
        let res = await modifyType({
          _id: this.formModalType._id,
          type: this.formModalType.type,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeTypeAsync (index) {
      try {
        let res = await removeType({
          _id: this.tBody[index]._id,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    modalAddType () {
      this.modalType = 'new'
      this.formModalType._id = ''
      this.formModalType.type = ''
      this.isModalShow = true
    },
    modalmodifyType (index) {
      this.modalType = 'edit'
      this.formModalType._id = this.tBody[index]._id
      this.formModalType.type = this.tBody[index].type
      this.isModalShow = true
    },

    // 提交新增和修改
    modalTypeSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isModalShow = false
          if (this.modalType === 'edit') {
            this.modifyTypeAsync()
          } else if (this.modalType === 'new') {
            this.addTypeAsync()
          }
        } else {
          this.$Message.error('请先填写表单')
        }
      })
      this.$Modal.remove()
    },
    modalremoveType (index) {
      this.$Modal.confirm({
        title: '删除分类',
        content: '<p>确定删除分类吗？</p>',
        onOk: () => {
          this.removeTypeAsync(index)
        }
      })
    },
    handleStatus (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.$Message.success(res.data.msg)
          this.typesListAsync()
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          this.typesListAsync()
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
</script>

<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="ios-people"></Icon>
        客户列表
      </h2>
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAdd">
          <Icon type="ios-compose-outline"></Icon>
          添加客户
        </Button>
        <Button type="primary" size="large" @click="exportData">
          <Icon type="ios-download-outline"></Icon>
          导出客户数据
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="80">
        <FormItem label="姓名" prop="customerName" class="modal-input">
          <Input v-model="formModal.customerName" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="电话" prop="customerPhone" class="modal-input">
          <Input v-model="formModal.customerPhone" placeholder="请输入电话"></Input>
        </FormItem>
        <FormItem label="地址" prop="customerAddress" class="modal-input">
          <Input v-model="formModal.customerAddress" type="textarea" placeholder="请输入地址"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalSubmit('formModal')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { customersList, addCustomer, modifyCustomer, removeCustomer } from '@/axios/axios.js'
import list from '@/mixin/list.js'

export default {
  mixins: [
    list
  ],
  data () {
    return {
      tHeader: [
        {
          title: '姓名',
          key: 'customerName',
          width: 120,
          ellipsis: true
        },
        {
          title: '电话',
          key: 'customerPhone',
          width: 150
        },
        {
          title: '地址',
          key: 'customerAddress'
        },
        {
          title: '操作',
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'edit'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalModify(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'trash-a'
                },
                on: {
                  click: () => {
                    this.modalRemove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      formModal: {
        _id: '',
        customerName: '',
        customerPhone: '',
        customerAddress: ''
      },
      ruleModal: {
        customerName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        customerPhone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
        customerAddress: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async listAsync () {
      try {
        this.tLoading = true
        let res = await customersList()
        this.listStatusHandler(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addAsync () {
      try {
        let res = await addCustomer({
          customerName: this.formModal.customerName,
          customerPhone: this.formModal.customerPhone,
          customerAddress: this.formModal.customerAddress
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyAsync () {
      try {
        let res = await modifyCustomer({
          _id: this.formModal._id,
          customerName: this.formModal.customerName,
          customerPhone: this.formModal.customerPhone,
          customerAddress: this.formModal.customerAddress
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsync (index) {
      try {
        let res = await removeCustomer({
          _id: this.tBody[index]._id
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    modalAdd () {
      this.modalType = 'new'
      this.formModal._id = ''
      this.formModal.customerName = ''
      this.formModal.customerPhone = ''
      this.formModal.customerAddress = ''
      this.isModalShow = true
    },
    modalModify (index) {
      this.modalType = 'edit'
      this.formModal._id = this.tBody[index]._id
      this.formModal.customerName = this.tBody[index].customerName
      this.formModal.customerPhone = this.tBody[index].customerPhone
      this.formModal.customerAddress = this.tBody[index].customerAddress
      this.isModalShow = true
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '客户数据'
      })
    }
  }
}
</script>

<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="social-usd"></Icon>
        收入列表
      </h2>
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAdd">
          <Icon type="ios-compose-outline"></Icon>
          添加收入
        </Button>
        <Button type="primary" size="large" @click="exportData">
          <Icon type="ios-download-outline"></Icon>
          导出收入数据
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="80">
        <FormItem label="商品名" prop="productName" class="modal-input">
          <ProductSelect v-model="formModal.productName" :filterable="true" placeholder="请选择商品"></ProductSelect>
        </FormItem>
        <FormItem label="客户姓名" prop="customerName" class="modal-input">
          <CustomerSelect v-model="formModal.customerName" :filterable="true" placeholder="请选择客户"></CustomerSelect>
        </FormItem>
        <FormItem label="售出日期" prop="sellDate">
          <DatePicker type="date" v-model="formModal.sellDate" placeholder="请选择日期"></DatePicker>
        </FormItem>
        <FormItem label="进价" prop="purchasePrice" class="modal-input">
          <Input number v-model="formModal.purchasePrice" placeholder="请输入进价"></Input>
        </FormItem>
        <FormItem label="售价" prop="productPrice" class="modal-input">
          <Input number v-model="formModal.productPrice" placeholder="请输入售价"></Input>
        </FormItem>
        <FormItem label="售出数量" prop="sellNumber">
          <InputNumber :min="1" v-model="formModal.sellNumber"></InputNumber>
        </FormItem>
        <FormItem label="快递费" prop="expressFee" class="modal-input">
          <Input number v-model="formModal.expressFee" placeholder="请输入快递支出"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalSubmit('formModal')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Moment from 'moment'
import Cookies from 'js-cookie'
import { earningsList, addEarning, modifyEarning, removeEarning } from '@/axios/axios.js'
import list from '@/mixin/list.js'

export default {
  mixins: [
    list
  ],
  data () {
    return {
      tHeader: [
        {
          title: '商品',
          key: 'productName'
        },
        {
          title: '客户',
          key: 'customerName',
          width: 80
        },
        {
          title: '进价',
          key: 'purchasePrice',
          width: 70
        },
        {
          title: '售价',
          key: 'productPrice',
          width: 70
        },
        {
          title: '售出数量',
          key: 'sellNumber',
          width: 90
        },
        {
          title: '快递支出',
          key: 'expressFee',
          width: 90
        },
        {
          title: '售出日期',
          key: '_sellDate',
          width: 100
        },
        {
          title: '利润',
          key: '_profit',
          width: 70
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
        productName: '',
        customerName: '',
        purchasePrice: null,
        productPrice: null,
        sellNumber: null,
        expressFee: null,
        sellDate: null
      },
      ruleModal: {
        productName: [{ required: true, message: '商品名不能为空', trigger: 'change' }],
        customerName: [{ required: true, message: '客户姓名不能为空', trigger: 'change' }],
        purchasePrice: [{ required: true, type: 'number', message: '进价不能为空', trigger: 'blur' }],
        productPrice: [{ required: true, type: 'number', message: '售价不能为空', trigger: 'blur' }],
        sellNumber: [{ required: true, type: 'number', message: '售出数量不能为空', trigger: 'change' }],
        expressFee: [{ required: true, type: 'number', message: '快递支出不能为空', trigger: 'blur' }],
        sellDate: [{ required: true, type: 'date', message: '售出日期不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    async listAsync () {
      try {
        this.tLoading = true
        let res = await earningsList()
        this.listStatusSelfHandler(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addAsync () {
      try {
        let res = await addEarning({
          productName: this.formModal.productName,
          customerName: this.formModal.customerName,
          purchasePrice: this.formModal.purchasePrice,
          productPrice: this.formModal.productPrice,
          sellNumber: this.formModal.sellNumber,
          expressFee: this.formModal.expressFee,
          sellDate: this.formModal.sellDate
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyAsync () {
      try {
        let res = await modifyEarning({
          _id: this.formModal._id,
          productName: this.formModal.productName,
          customerName: this.formModal.customerName,
          purchasePrice: this.formModal.purchasePrice,
          productPrice: this.formModal.productPrice,
          sellNumber: this.formModal.sellNumber,
          expressFee: this.formModal.expressFee,
          sellDate: this.formModal.sellDate
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsync (index) {
      try {
        let res = await removeEarning({
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
      this.formModal.productName = ''
      this.formModal.customerName = ''
      this.formModal.purchasePrice = null
      this.formModal.productPrice = null
      this.formModal.sellNumber = null
      this.formModal.expressFee = null
      this.formModal.sellDate = null
      this.isModalShow = true
    },
    modalModify (index) {
      this.modalType = 'edit'
      this.formModal._id = this.tBody[index]._id
      this.formModal.productName = this.tBody[index].productName
      this.formModal.customerName = this.tBody[index].customerName
      this.formModal.purchasePrice = this.tBody[index].purchasePrice
      this.formModal.productPrice = this.tBody[index].productPrice
      this.formModal.sellNumber = this.tBody[index].sellNumber
      this.formModal.expressFee = this.tBody[index].expressFee
      this.formModal.sellDate = this.tBody[index].sellDate
      this.isModalShow = true
    },
    listStatusSelfHandler (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.tBody = res.data.result.list.map(e => {
            return {
              ...e,
              _profit: (e.productPrice - e.purchasePrice) * e.sellNumber - e.expressFee,
              _sellDate: Moment(e.sellDate).format('YYYY-MM-DD')
            }
          })
          this.tLoading = false
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.tBody = res.data.result.list.map(e => {
            return {
              ...e,
              _profit: (e.productPrice - e.purchasePrice) * e.sellNumber - e.expressFee,
              _sellDate: Moment(e.sellDate).format('YYYY-MM-DD')
            }
          })
          this.tLoading = false
          break
        // 验证失败
        default:
          this.$router.push('/login')
          break
      }
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '商品数据'
      })
    }
  }
}
</script>

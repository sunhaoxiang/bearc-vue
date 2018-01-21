<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAdd">
          <Icon type="ios-compose-outline"></Icon>
          添加商品
        </Button>
        <Button type="primary" size="large" @click="exportData">
          <Icon type="ios-download-outline"></Icon>
          导出商品数据
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="80">
        <FormItem label="商品名" prop="productName">
          <Input v-model="formModal.productName" placeholder="请输入商品名"></Input>
        </FormItem>
        <FormItem label="进价" prop="purchasePrice">
          <Input number v-model="formModal.purchasePrice" placeholder="请输入进价"></Input>
        </FormItem>
        <FormItem label="售价" prop="productPrice">
          <Input number v-model="formModal.productPrice" placeholder="请输入售价"></Input>
        </FormItem>
        <FormItem label="分类" prop="productType">
          <TypeSelect v-model="formModal.productType" placeholder="请输入分类"></TypeSelect>
        </FormItem>
        <FormItem label="国家" prop="productCountry">
          <CountrySelect v-model="formModal.productCountry" placeholder="请输入国家"></CountrySelect>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalSubmit('formModal')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { goodsList, addGood, modifyGood, removeGood } from '@/axios/axios.js'
import goods from '@/mixin/goods.js'

export default {
  mixins: [
    goods
  ],
  data () {
    return {
      tHeader: [
        {
          title: '商品',
          key: 'productName',
          ellipsis: true
        },
        {
          title: '进价',
          key: 'purchasePrice',
          width: 100
        },
        {
          title: '售价',
          key: 'productPrice',
          width: 100
        },
        {
          title: '分类',
          key: 'productType',
          width: 100
        },
        {
          title: '国家',
          key: 'productCountry',
          width: 100
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
        purchasePrice: null,
        productPrice: null,
        productType: '',
        productCountry: ''
      },
      ruleModal: {
        productName: [{ required: true, message: '商品名不能为空', trigger: 'blur' }],
        purchasePrice: [{ required: true, type: 'number', message: '进价不能为空', trigger: 'blur' }],
        productPrice: [{ required: true, type: 'number', message: '售价不能为空', trigger: 'blur' }],
        productType: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
        productCountry: [{ required: true, message: '国家不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async listAsync () {
      try {
        this.tLoading = true
        let res = await goodsList()
        this.listStatusHandler(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addAsync () {
      try {
        let res = await addGood({
          productName: this.formModal.productName,
          purchasePrice: this.formModal.purchasePrice,
          productPrice: this.formModal.productPrice,
          productType: this.formModal.productType,
          productCountry: this.formModal.productCountry
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyAsync () {
      try {
        let res = await modifyGood({
          _id: this.formModal._id,
          productName: this.formModal.productName,
          purchasePrice: this.formModal.purchasePrice,
          productPrice: this.formModal.productPrice,
          productType: this.formModal.productType,
          productCountry: this.formModal.productCountry
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsync (index) {
      try {
        let res = await removeGood({
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
      this.formModal.purchasePrice = null
      this.formModal.productPrice = null
      this.formModal.productType = ''
      this.formModal.productCountry = ''
      this.isModalShow = true
    },
    modalModify (index) {
      this.modalType = 'edit'
      this.formModal._id = this.tBody[index]._id
      this.formModal.productName = this.tBody[index].productName
      this.formModal.purchasePrice = this.tBody[index].purchasePrice
      this.formModal.productPrice = this.tBody[index].productPrice
      this.formModal.productType = this.tBody[index].productType
      this.formModal.productCountry = this.tBody[index].productCountry
      this.isModalShow = true
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '商品数据'
      })
    }
  }
}
</script>

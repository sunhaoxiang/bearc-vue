<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAddGood">
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
      <Form ref="formModalGood" :model="formModalGood" :rules="ruleModalGood" :label-width="80">
        <FormItem label="商品名" prop="productName">
          <Input v-model="formModalGood.productName" placeholder="请输入商品名"></Input>
        </FormItem>
        <FormItem label="进价" prop="purchasePrice">
          <Input number v-model="formModalGood.purchasePrice" placeholder="请输入进价"></Input>
        </FormItem>
        <FormItem label="售价" prop="productPrice">
          <Input number v-model="formModalGood.productPrice" placeholder="请输入售价"></Input>
        </FormItem>
        <FormItem label="分类" prop="productType">
          <Input v-model="formModalGood.productType" placeholder="请输入分类"></Input>
        </FormItem>
        <FormItem label="国家" prop="productCountry">
          <Input v-model="formModalGood.productCountry" placeholder="请输入国家"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalGoodSubmit('formModalGood')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { goodsList, addGood, modifyGood, removeGood } from '@/axios/axios.js'

export default {
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
                    this.modalModifyGood(params.index)
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
                    this.modalRemoveGood(params.index)
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
      formModalGood: {
        _id: '',
        productName: '',
        purchasePrice: null,
        productPrice: null,
        productType: '',
        productCountry: ''
      },
      ruleModalGood: {
        productName: [{ required: true, message: '商品名不能为空', trigger: 'blur' }],
        purchasePrice: [{ required: true, type: 'number', message: '进价不能为空', trigger: 'blur' }],
        productPrice: [{ required: true, type: 'number', message: '售价不能为空', trigger: 'blur' }],
        productType: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
        productCountry: [{ required: true, message: '国家不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    modalTitle () {
      return this.modalType === 'new' ? '添加商品' : '修改商品'
    }
  },
  created () {
    this.goodsListAsync()
  },
  methods: {
    async goodsListAsync () {
      try {
        this.tLoading = true
        let res = await goodsList({
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
    async addGoodAsync () {
      try {
        let res = await addGood({
          productName: this.formModalGood.productName,
          purchasePrice: this.formModalGood.purchasePrice,
          productPrice: this.formModalGood.productPrice,
          productType: this.formModalGood.productType,
          productCountry: this.formModalGood.productCountry,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyGoodAsync () {
      try {
        let res = await modifyGood({
          _id: this.formModalGood._id,
          productName: this.formModalGood.productName,
          purchasePrice: this.formModalGood.purchasePrice,
          productPrice: this.formModalGood.productPrice,
          productType: this.formModalGood.productType,
          productCountry: this.formModalGood.productCountry,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeGoodAsync (index) {
      try {
        let res = await removeGood({
          _id: this.tBody[index]._id,
          token: Cookies.get('bearcToken')
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    modalAddGood () {
      this.modalType = 'new'
      this.formModalGood._id = ''
      this.formModalGood.productName = ''
      this.formModalGood.purchasePrice = null
      this.formModalGood.productPrice = null
      this.formModalGood.productType = ''
      this.formModalGood.productCountry = ''
      this.isModalShow = true
    },
    modalModifyGood (index) {
      this.modalType = 'edit'
      this.formModalGood._id = this.tBody[index]._id
      this.formModalGood.productName = this.tBody[index].productName
      this.formModalGood.purchasePrice = this.tBody[index].purchasePrice
      this.formModalGood.productPrice = this.tBody[index].productPrice
      this.formModalGood.productType = this.tBody[index].productType
      this.formModalGood.productCountry = this.tBody[index].productCountry
      this.isModalShow = true
    },

    // 提交新增和修改
    modalGoodSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isModalShow = false
          if (this.modalType === 'edit') {
            this.modifyGoodAsync()
          } else if (this.modalType === 'new') {
            this.addGoodAsync()
          }
        } else {
          this.$Message.error('请先填写表单')
        }
      })
      this.$Modal.remove()
    },
    modalRemoveGood (index) {
      this.$Modal.confirm({
        title: '删除商品',
        content: '<p>确定删除商品吗？</p>',
        onOk: () => {
          this.removeGoodAsync(index)
        }
      })
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '商品数据'
      })
    },
    handleStatus (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.$Message.success(res.data.msg)
          this.goodsListAsync()
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          this.goodsListAsync()
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

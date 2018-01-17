<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="isAddGoodsModalShow = true">
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
      width='800'
      :mask-closable='false'
      v-model="isAddGoodsModalShow"
      title="添加商品"
      @on-ok="addGoodsSubmit"
      @on-cancel="addGoodsCancel">
      <Form :model="formAddGoods" :rules="ruleAddGoods" :label-width="80">
        <FormItem label="商品名称" prop="productName">
          <Input v-model="formAddGoods.productName" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="商品图片" prop="productImgSrc">
          <Upload
            action="http://localhost:9999/users/upload/"
            name="image"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            :max-size="2048"
            :data="token"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-remove="uploadRemove">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          <Input class="upload-img-src" v-model="formAddGoods.productImgsrc"></Input>
          <img class="upload-img" :src="formAddGoods.productImgSrc">
        </FormItem>
        <FormItem label="商品进价" prop="purchasePrice">
          <Input v-model="formAddGoods.purchasePrice" placeholder="请输入进价"></Input>
        </FormItem>
        <FormItem label="商品售价" prop="productPrice">
          <Input v-model="formAddGoods.productPrice" placeholder="请输入售价"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isModalShow"
      title="Common Modal dialog box title"
      @on-ok="modalGoodSubmit"
      @on-cancel="modalGoodCancel">
      <Form :model="formModalGood" :rules="ruleModalGood" :label-width="80">
        <FormItem label="商品名" prop="productName">
          <Input v-model="formModalGood.productName" placeholder="请输入商品名"></Input>
        </FormItem>
        <FormItem label="进价" prop="purchasePrice">
          <Input number v-model="formModalGood.purchasePrice" placeholder="请输入进价"></Input>
        </FormItem>
        <FormItem label="售价" prop="productPrice">
          <Input number v-model="formModalGood.productPrice" placeholder="请输入售价"></Input>
        </FormItem>
        <FormItem label="分类" prop="productClass">
          <Input v-model="formModalGood.productClass" placeholder="请输入分类"></Input>
        </FormItem>
        <FormItem label="国家" prop="productCountry">
          <Input v-model="formModalGood.productCountry" placeholder="请输入国家"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { goodsList, modifyGood } from '@/axios/axios.js'

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
          title: '折扣价',
          key: 'productDiscountPrice',
          width: 100
        },
        {
          title: '分类',
          key: 'productClass',
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
                    this.changeGood(params.index)
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
                    this.removeGood(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tBody: [],
      tLoading: false,
      isAddGoodsModalShow: false,
      isModalShow: false,
      modalType: '',
      formAddGoods: {
        productName: '',
        productImgSrc: '',
        purchasePrice: 0,
        productPrice: 0
      },
      ruleAddGoods: {
        productName: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ]
      },
      formModalGood: {
        _id: '',
        productName: '',
        purchasePrice: 0,
        productPrice: 0,
        productClass: '',
        productCountry: ''
      },
      ruleModalGood: {

      }
    }
  },
  computed: {
    token () {
      return {
        token: Cookies.get('bearcToken')
      }
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
      } catch (err) {
        this.tLoading = false
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
          productClass: this.formModalGood.productClass,
          productCountry: this.formModalGood.productCountry,
          token: Cookies.get('bearcToken')
        })
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
            // this.$router.push('/login')
            this.$Message.error(res.data.msg)
            break
        }
      } catch (err) {
        console.log(err)
      }
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '商品数据'
      })
    },
    changeGood (index) {
      this.modalType = 'edit'
      this.formModalGood._id = this.tBody[index]._id
      this.formModalGood.productName = this.tBody[index].productName
      this.formModalGood.purchasePrice = this.tBody[index].purchasePrice
      this.formModalGood.productPrice = this.tBody[index].productPrice
      this.formModalGood.productClass = this.tBody[index].productClass
      this.formModalGood.productCountry = this.tBody[index].productCountry
      this.isModalShow = true
    },
    removeGood (index) {
      console.log(`remove ${index}`)
    },
    addGoodsSubmit () {},
    addGoodsCancel () {},
    modalGoodSubmit () {
      if (this.modalType === 'edit') {
        this.modifyGoodAsync()
      } else {
        console.log('new')
      }
    },
    modalGoodCancel () {},
    uploadSuccess (res, file) {
      this.formAddGoods.productImgSrc = res.result.path
    },
    uploadError (err, file) {
      console.log(err)
      this.$Message.error('上传失败')
    },
    uploadRemove (file) {
      this.formAddGoods.productImgSrc = ''
    }
  }
}
</script>

<style scoped lang="scss">
.upload-img-src {
  display: none;
}
.upload-img {
  display: block;
  width: 200px;
}
</style>

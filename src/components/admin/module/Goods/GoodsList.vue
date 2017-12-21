<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="addGoodsBtn = true">
          <Icon type="ios-compose-outline"></Icon>
          添加商品
        </Button>
        <Button type="primary" size="large" @click="exportData">
          <Icon type="ios-download-outline"></Icon>
          导出商品数据
        </Button>
      </div>
      <Table :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      width='800'
      :mask-closable='false'
      v-model="addGoodsBtn"
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
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getGoodsList } from '@/axios/axios.js'

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
      addGoodsBtn: false,
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
  methods: {
    async getGoodsListAsync () {
      try {
        let res = await getGoodsList({
          token: Cookies.get('bearcToken')
        })
        switch (res.data.status) {
          // 验证成功
          case 0:
            this.tBody = res.data.result.list
            break
          // 验证成功，但需要更新token
          case 1:
            Cookies.set('bearcToken', res.data.result.newToken)
            this.tBody = res.data.result.list
            break
          // 验证失败
          default:
            this.$router.push('/login')
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
      console.log(`change ${index}`)
    },
    removeGood (index) {
      console.log(`remove ${index}`)
    },
    addGoodsSubmit () {},
    addGoodsCancel () {},
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
  },
  created () {
    this.getGoodsListAsync()
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

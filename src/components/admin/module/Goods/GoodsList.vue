<template>
  <div>
    <Card shadow class="admin-card center">
      <Table :columns="tHeader" :data="tBody"></Table>
    </Card>
  </div>
</template>

<script>
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
                    this.change(params.index)
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
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tBody: [
        {
          productName: '商品1商品1商品1商品1商品1',
          class: '母婴',
          country: 'aaa',
          productPrice: 100,
          productDiscountPrice: 120,
          discount: 80
        },
        {
          productName: '商品2商品2商品2',
          class: '饰品',
          country: 'aaa',
          productPrice: 20,
          productDiscountPrice: 30,
          discount: 0
        },
        {
          productName: '商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3',
          class: '饰品',
          country: '澳大利亚',
          productPrice: 150,
          productDiscountPrice: 200,
          discount: 180
        },
        {
          productName: '商品4商品4商品4',
          class: '饰品',
          country: 'aaa',
          productPrice: 300,
          productDiscountPrice: 350,
          discount: 345
        }
      ]
    }
  },
  methods: {
    async getGoodsListAsync () {
      try {
        let res = await getGoodsList({
          token: localStorage.getItem('bearcToken')
        })
        switch (res.data.status) {
          // 验证成功
          case 0:
            this.tBody = res.data.result.list
            break
          // 验证成功，但需要更新token
          case 1:
            localStorage.setItem('bearcToken', res.data.result.newToken)
            this.tBody = res.data.result.list
            break
          // 验证失败
          default:
            this.$router.push('/login')
            break
        }
        // this.goodsList = res.data.result.list
      } catch (err) {
        console.log(err)
      }
    },
    change (index) {
      console.log(`change ${index}`)
    },
    remove (index) {
      console.log(`remove ${index}`)
    }
  },
  created () {
    this.getGoodsListAsync()
  }
}
</script>

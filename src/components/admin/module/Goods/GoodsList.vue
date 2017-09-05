<template>
  <div>
    <Card shadow class="admin-card center">
      <Table :columns="tHeader" :data="tBody"></Table>
    </Card>
  </div>
</template>

<script>
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
          title: '分类',
          key: 'class',
          width: 100
        },
        {
          title: '进价',
          key: 'productPrice',
          width: 100
        },
        {
          title: '售价',
          key: 'productDiscountPrice',
          width: 100
        },
        {
          title: '折扣',
          key: 'discount',
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
                    this.show(params.index)
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
          productPrice: 100,
          productDiscountPrice: 120,
          discount: '100%'
        },
        {
          productName: '商品2商品2商品2',
          class: '饰品',
          productPrice: 20,
          productDiscountPrice: 30,
          discount: '100%'
        },
        {
          productName: '商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3商品3',
          class: '饰品',
          productPrice: 150,
          productDiscountPrice: 200,
          discount: '100%'
        },
        {
          productName: '商品4商品4商品4',
          class: '饰品',
          productPrice: 300,
          productDiscountPrice: 350,
          discount: '100%'
        }
      ]
    }
  },
  methods: {
    show (index) {
      console.log(`show ${index}`)
    },
    remove (index) {
      console.log(`remove ${index}`)
    }
  }
}
</script>

<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAdd">
          <Icon type="ios-compose-outline"></Icon>
          添加分类
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="80">
        <FormItem label="分类" prop="type">
          <Input v-model="formModal.type" placeholder="请输入分类"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalSubmit('formModal')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { typesList, addType, modifyType, removeType } from '@/axios/axios.js'
import goods from '@/mixin/goods.js'

export default {
  mixins: [
    goods
  ],
  data () {
    return {
      tHeader: [
        {
          title: '分类',
          key: 'type'
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
                    this.modalModify(params.index)
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
        type: ''
      },
      ruleModal: {
        type: [{ required: true, message: '分类名不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async listAsync () {
      try {
        this.tLoading = true
        let res = await typesList()
        this.listStatusHandler(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addAsync () {
      try {
        let res = await addType({
          type: this.formModal.type
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyAsync () {
      try {
        let res = await modifyType({
          _id: this.formModal._id,
          type: this.formModal.type
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsync (index) {
      try {
        let res = await removeType({
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
      this.formModal.type = ''
      this.isModalShow = true
    },
    modalModify (index) {
      this.modalType = 'edit'
      this.formModal._id = this.tBody[index]._id
      this.formModal.type = this.tBody[index].type
      this.isModalShow = true
    }
  }
}
</script>

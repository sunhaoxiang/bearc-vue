<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="earth"></Icon>
        国家列表
      </h2>
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAdd">
          <Icon type="ios-compose-outline"></Icon>
          添加国家
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
      <Page v-if="page.total > 10" :total="page.total" @on-change="pageChangeHandler" class="ma-t-10"></Page>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="80">
        <FormItem label="国家" prop="country" class="modal-input">
          <Input v-model="formModal.country" placeholder="请输入国家"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalSubmit('formModal')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { countriesList, addCountry, modifyCountry, removeCountry } from '@/axios'
import list from '@/mixin/list.js'

export default {
  mixins: [
    list
  ],
  data () {
    return {
      tHeader: [
        {
          title: '国家',
          key: 'country'
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
                  icon: 'trash-b'
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
        country: ''
      },
      ruleModal: {
        country: [{ required: true, message: '国家名不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async listAsync () {
      try {
        this.tLoading = true
        let res = await countriesList({
          current: this.page.current,
          size: this.page.size
        })
        this.listStatusHandler(res)
      } catch (err) {
        this.tLoading = false
        console.log(err)
      }
    },
    async addAsync () {
      try {
        let res = await addCountry({
          country: this.formModal.country
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyAsync () {
      try {
        let res = await modifyCountry({
          _id: this.formModal._id,
          country: this.formModal.country
        })
        this.actionStatusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsync (index) {
      try {
        let res = await removeCountry({
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
      this.formModal.country = ''
      this.isModalShow = true
    },
    modalModify (index) {
      this.modalType = 'edit'
      this.formModal._id = this.tBody[index]._id
      this.formModal.country = this.tBody[index].country
      this.isModalShow = true
    }
  }
}
</script>

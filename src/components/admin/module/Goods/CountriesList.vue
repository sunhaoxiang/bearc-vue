<template>
  <div>
    <Card shadow class="admin-card center">
      <div class="ma-b-10">
        <Button type="primary" size="large" @click="modalAddCountry">
          <Icon type="ios-compose-outline"></Icon>
          添加国家
        </Button>
      </div>
      <Table :loading="tLoading" :columns="tHeader" :data="tBody" ref="table"></Table>
    </Card>
    <Modal
      v-model="isModalShow"
      :title="modalTitle">
      <Form ref="formModalCountry" :model="formModalCountry" :rules="ruleModalCountry" :label-width="80">
        <FormItem label="国家" prop="country">
          <Input v-model="formModalCountry.country" placeholder="请输入国家"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modalCountrySubmit('formModalCountry')">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { countriesList, addCountry, modifyCountry, removeCountry } from '@/axios/axios.js'

export default {
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
                    this.modalmodifyCountry(params.index)
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
                    this.modalremoveCountry(params.index)
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
      formModalCountry: {
        _id: '',
        country: ''
      },
      ruleModalCountry: {
        country: [{ required: true, message: '国家名不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    modalTitle () {
      return this.modalType === 'new' ? '添加国家' : '修改国家'
    }
  },
  created () {
    this.countriesListAsync()
  },
  methods: {
    async countriesListAsync () {
      try {
        this.tLoading = true
        let res = await countriesList()
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
    async addCountryAsync () {
      try {
        let res = await addCountry({
          country: this.formModalCountry.country
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async modifyCountryAsync () {
      try {
        let res = await modifyCountry({
          _id: this.formModalCountry._id,
          country: this.formModalCountry.country
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    async removeCountryAsync (index) {
      try {
        let res = await removeCountry({
          _id: this.tBody[index]._id
        })
        this.handleStatus(res)
      } catch (err) {
        console.log(err)
      }
    },
    modalAddCountry () {
      this.modalType = 'new'
      this.formModalCountry._id = ''
      this.formModalCountry.country = ''
      this.isModalShow = true
    },
    modalmodifyCountry (index) {
      this.modalType = 'edit'
      this.formModalCountry._id = this.tBody[index]._id
      this.formModalCountry.country = this.tBody[index].country
      this.isModalShow = true
    },

    // 提交新增和修改
    modalCountrySubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isModalShow = false
          if (this.modalType === 'edit') {
            this.modifyCountryAsync()
          } else if (this.modalType === 'new') {
            this.addCountryAsync()
          }
        } else {
          this.$Message.error('请先填写表单')
        }
      })
      this.$Modal.remove()
    },
    modalremoveCountry (index) {
      this.$Modal.confirm({
        title: '删除国家',
        content: '<p>确定删除国家吗？</p>',
        onOk: () => {
          this.removeCountryAsync(index)
        }
      })
    },
    handleStatus (res) {
      switch (res.data.status) {
        // 验证成功
        case 0:
          this.$Message.success(res.data.msg)
          this.countriesListAsync()
          break
        // 验证成功，但需要更新token
        case 1:
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          this.countriesListAsync()
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

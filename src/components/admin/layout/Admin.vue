<template>
  <div>
    <admin-header :activeName="routeName"></admin-header>
    <router-view class="body-wrapper body-min-height"></router-view>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

export default {
  name: 'adminLayout',
  data () {
    return {
      routeName: '',
      logoutModal: false
    }
  },
  methods: {
  },
  watch: {
    $route (val, oldVal) {
      this.routeName = val.matched[1].name
    }
  },
  created () {
    this.routeName = this.$route.matched[1].name
  },
  components: {
    AdminHeader,
    AdminFooter
  }
}
</script>

export default {
  data () {
    return {
      routeName: ''
    }
  },
  watch: {
    $route (val, oldVal) {
      this.routeName = val.matched[2].name
    }
  },
  created () {
    this.routeName = this.$route.matched[2].name
  },
  methods: {
    selectMenu (name) {
      this.$router.push(`/${this.$route.matched[1].name}/${name}`)
    }
  }
}

<template>
  <AdminNav />
</template>

<script>
import AdminNav from '~/components/AdminNav.vue'

export default {
  components: {
    AdminNav
  },
  middleware: 'auth',
  data () {
    return {
      // data goes here
    }
  },
  mounted () {
    // stuff goes here
  },
  methods: {
    // stuff goes here
  }
}
</script>

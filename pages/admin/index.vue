<template>
  <main>The admin</main>
</template>

<script>
export default {
  middleware: 'auth',
  mounted () {
    // create logout button.
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        window.location.replace('/')
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    }
  }
}
</script>

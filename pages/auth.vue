<template>
  <section class="container">
    <form v-on:submit.prevent="login">
      <div style="margin-top: 10px;">
        <label for="username">Email</label>
        <input type="text" name="email" v-model="email" autofocus>
      </div>
      <div style="margin-top: 10px;">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div style="margin-top: 10px;">
        <input type="submit" value="Log In">
      </div>
    </form>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Sign In'
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  fetch ({ store, redirect }) {
    if (store.state.user) {
      return redirect('/admin')
    }
    return false
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.email = ''
        this.password = ''
        window.location.replace('/admin')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

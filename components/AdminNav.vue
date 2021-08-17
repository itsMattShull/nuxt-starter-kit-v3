<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-button v-b-toggle.sidebar-backdrop>
        <b-icon icon="list" aria-hidden="true"></b-icon>
      </b-button>

      <b-sidebar
        id="sidebar-backdrop"
        title="Sidebar with backdrop"
        backdrop-variant="dark"
        backdrop
        shadow
      >
        <div class="px-3 py-2">
          Hello world
        </div>
      </b-sidebar>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.firstName }}</em>
            </template>
            <b-dropdown-item href="#" @click="logout">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      user: this.$store.state.user
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        window.location.replace('/auth')
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

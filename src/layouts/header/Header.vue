<template>
  <v-app-bar app clipped-left clipped-right color="white" light>
    <router-link to="/" class="navbar-brand" >
      <v-toolbar-title class="align-center d-flex">
        <span class="logo-icon">
          <img src="@/assets/logo-icon.png" />
        </span>
        <span class="logo-text ml-2">
          <img src="@/assets/logo-text.png" class="mt-2" />
        </span>
      </v-toolbar-title>
    </router-link>
    <v-app-bar-nav-icon
      class="d-block d-md-none"
      @click="
        $vuetify.breakpoint.smAndDown
          ? setSidebarDrawer(!Sidebar_drawer)
          : $emit('input', !value)
      "
    />
    <v-spacer />
    <!---right part -->
    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn light icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item 
          v-for="(item, i) in userprofile"
          :key="i" 
          v-on="item.action == 'logOut' ? { click: logOut } : null"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
import Cookies from 'js-cookie';

export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    userprofile: [
      { title: "My Profile" },
      { title: "My Balance" },
      { title: "Inbox" },
      { title: "Account Setting" },
      { title: "Logout", action: "logOut" },
    ],
  }),

  computed: {
    ...mapState(["Sidebar_drawer"]),
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),

    logOut() {
      console.log('logged out');
      Cookies.remove('jwt');
      Cookies.remove('key');
      this.$store.commit('HandleLogIn');
      this.$router.push('/sign-in');
    }
  },
};
</script>

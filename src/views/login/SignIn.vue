<template>
    <div class="vue-tempalte">
        <form @submit.prevent="login">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="emailAddress" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>

            <button @click="login" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/sign-up">Sign up?</router-link>
            </p>

        </form>
    </div>
</template>

<script>
import LoginService from '../../services/LoginService.js';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      URL: "http://112.137.129.214:35280/stafflogin/",
      emailAddress: "",
      password: ""
    }
  },

  methods: {
    login() {
      LoginService.request("http://localhost:8000/stafflogin/", "POST", {
        email: this.emailAddress, 
        password: this.password
      }, {
        "Content-type": "application/json"
      }).then(async () => {
        this.$store.state.LoggedIn = true;
        this.$router.push('/pages/');
      }).catch(err => {
        console.error(err);
      })
    }
  },
  mounted() {
    if (Cookies.get('jwt') != null && Cookies.get('key') != null) {
      this.$router.push('/pages/list-email');
      return;
    }
  }
}
</script>

<style scoped src="../../assets/styles/SignIn.css">

</style>
<template>
  <div class="create-box">
      <form action="http://localhost:8080/api/users/create-user" method="POST">
        <div class="form-group">
            <label for="username"><b>Username</b></label>
            <input type="text" class="form-control" name="username" id="username"
            v-model="username"
            />
        </div>
        <div class="form-group">
            <label for="address"><b>Email Address</b></label>
            <input type="text" class="form-control" name="address" id="address"
            v-model="password"
            />
        </div>

        <button class="btn btn-primary" type="submit" @click="onSubmit">Create</button>
    </form>

  </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            username: "",
            emaul_address: ""
        };
    },
    methods: {
        onSubmit() {
            // event.preventDefault();
            console.log(this.username + " " + this.password);
        }
    },
    mounted() {
        console.log('Mounted')
    }
}
</script>

<style scoped>
.btn {
  color: white;
}
.create-box {
    margin: 20px 50px;
    width: 50%;
}
</style>
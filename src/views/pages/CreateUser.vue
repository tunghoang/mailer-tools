<template>
  <div class="create-box">
      <form @action.prevent="onSubmit">
        <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input type="email" class="form-control" name="email" id="email"
            v-model="email"
            />
        </div>
        <div class="form-group">
            <label for="fullName"><b>Full name</b></label>
            <input type="text" class="form-control" name="fullName" id="fullName"
            v-model="fullName"
            />
        </div>
        <div class="form-group">
            <label for="idQuote"><b>idQuota</b></label>
            <input type="text" class="form-control" name="idQuota" id="idQuota"
            v-model="idQuota"
            />
        </div>
        <div class="form-group">
            <label for="idGueatAdvisor"><b>idGueatAdvisor</b></label>
            <input type="text" class="form-control" name="idGueatAdvisor" id="idGueatAdvisor"
            v-model="idGueatAdvisor"
            />
        </div>

        <button class="btn btn-primary" @click="onSubmit">Create</button>
    </form>

  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";

export default {
    name: "login",
    data() {
        return {
            email: "",
            fullName: "",
            idQuota: null,
            idGueatAdvisor: null
        };
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            let body = {
                email: this.email,
                fullname: this.fullName,
                idQuota: this.idQuota,
                idGuestAdvisor: this.idGuestAdvisor
            };
            UserDataService.request(
                "http://localhost:8000/advisors/",
                "POST",
                body
            ).then(response => {
                console.error(response);
            }).catch(err => {
                console.log(err);
            });
        }
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
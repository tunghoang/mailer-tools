<template>
  <div class="add_email_container">
    <div class="submit-form">
        <h2>Compose email</h2>
        <div v-if="!submitted">
          <div class="form-group">
            <label for="receiver">Recipient</label>
            <div style="display: flex">
              <select class="btn" name="receiver" id="receiver" v-model="receiver">
                <option v-for="(user, index) in users" :key="index" 
                :value="user.username.toString()">{{ user.username }}</option>
              </select>
              <button class="btn btn-primary" @click="addReceiver">Add</button>
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              required
              v-model="subject"
              name="subject"
            />
          </div>

          <div class="form-group">
            <label for="content">Content (Note: Using 'Name' variable inside double brackets )</label>
            <textarea rows="8"
              class="form-control"
              id="content"
              required
              v-model="content"
              name="content"
            />
          </div>

          <button @click="saveEmail" class="btn btn-success">Send</button>

          <button class="m-3 btn btn-sm btn-danger">
            <router-link to="/" class="nav-link" :style="{ color: 'white'}">Go back home</router-link>
          </button>
        </div>

        <div v-else>
          <h4>You submitted successfully!</h4>
          <button class="btn btn-success" @click="newEmail">Done</button>
        </div>
      </div>
      
      
      <div v-if="addedUser" class="list">
        <h2>Recipient List</h2>
        <div class="receiver_list">
            <button class="btn btn-primary mr-1 mt-1" 
            v-for="(email, index) in emailArray" 
            :key="index"
            :value="email.address"
            @click="user_info">
              {{ email.address }}
            </button>

            <div v-if="show" class="email_info">
              <p><b>Name</b>: {{ user.username }}</p>
              <p><b>Address</b>: {{ user.address }}</p>
            </div>

        </div>
      </div>
  </div>
  
  
</template>

<script>
import EmailDataService from "../../services/EmailDataService";
import UserDataService from "../../services/UserDataService";
const Mustache = require('mustache');

export default {
  name: "add-email",
  data() {
    return {
      addedUser: false,
      receiver: "",
      address: "",
      subject: "",
      content: "",
      submitted: false,
      emailArray: [],
      users: [],
      user: null,
      show: false,
    };
  },
  methods: {
    saveEmail() {
      var today = new Date();
      var hh = String(today.getHours()).padStart(2, '0')
      var mn = String(today.getMinutes()).padStart(2, '0')
      var ss = String(today.getSeconds()).padStart(2, '0')
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = hh + ':' + mn + ':' + ss + ' ' + mm + '/' + dd + '/' + yyyy;

      // Send 1 email
      if (this.emailArray.length == 0) {
        alert('No user has been chosen!')
      }

      // Send many email
      else {
        this.emailArray.forEach(email => {
          let content = Mustache.render(this.content, email);
          let data = {
            receiver: email.Name,
            address: email.address,
            subject: this.subject,
            content: content,
            composeAt: today
          };

          EmailDataService.create(data)
          .then(response => {
            console.log(response.data);
            this.submitted = true;  
          })
          .catch(e => {
            console.log(e);
          });
        });
      }

      this.emailArray  = [];
      this.receiver = '';
      this.address = '';
      this.subject = '';
      this.content = '';
      this.addedUser = false;
      this.submitted = false;
    },
    
    newEmail() {
      this.submitted = false;
    },

    addReceiver() {
      let receiver = this.receiver;
      let check = false;
      if (!receiver) return;
      this.addedUser = true;
      this.emailArray.forEach(email => {
        if (email.receiver == receiver)  {
          check = true;
        }
      })
      this.users.forEach(user => {
        if (user.username == receiver) {
          this.address = user.address;
        }
      })
      !check && this.emailArray.push({
        Name: receiver,
        address: this.address,
        content: `Dear ${receiver}, `
      })
      this.receiver = "";
      this.address = "";
      console.log(this.emailArray)
    },

    getAllUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getUserById(id) {
      UserDataService.get(id)
      .then(response => {
        this.user = response.data;
      })
    },
    user_info(event) {
      this.show = !this.show;
      this.users.forEach(user => {
        if (user.address == event.target.value) {
          this.user = user;
        }
      })
    }
  },
  mounted() {
    this.getAllUsers();
  }
};
</script>

<style scoped>
.add_email_container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 30px 0 30px 30px;
  max-width: 700px;
}
.submit-form {
  min-width: 450px;
}
.submit-form select {
  min-width: 90%;
}
.list {
  border: 1px solid rgb(219, 205, 205);
  border-radius: 10px;
  min-width: 300px;
  padding: 10px;
  align-self: flex-start;
  margin-left: 20px;
  position: relative;
}
.receiver_list {
  display: grid;
  grid-template-columns: auto;
}
#receiver {
  border: 1px solid #333;
}
.email_info {
  position: absolute;
  left: 110%;
  top: 10%;
  color: #333;
  border: 1px solid rgb(219, 205, 205);
  border-radius: 10px;
  padding: 10px;
}
</style>
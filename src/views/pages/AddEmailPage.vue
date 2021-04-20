<template>
  <div class="add_email_container">
    <div class="submit-form">
        <h2>Compose email</h2>
        <div v-if="!submitted">
          <div class="form-group">
            <label for="receiver">Recipient</label>
            <div style="display: flex">
              <select class="btn" name="receiver" id="receiver" v-model="advisorName">
                <option v-for="(advisor, index) in advisors" :key="index" 
                :value="advisor.fullname">{{ advisor.fullname }}</option>
              </select>
              <button class="btn btn-primary" @click="addReceipient">Add</button>
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

          <button @click="sendEmail" class="btn btn-success">Send</button>

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
            <div class="mr-1 mt-1" 
            v-for="(receipient, index) in receipientList" 
            :key="index"
            :value="receipient.email">
              <span class="advisorEmail"> {{ receipient.email }} </span>
              <button class="btn btn-danger ml-1" @click="removeReceipient" :value="receipient.email">Remove</button>
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
      advisorName: "",
      subject: "",
      content: "",
      submitted: false,
      receipientList: [],
      advisors: [],
    };
  },
  methods: {
    sendEmail() {
      // Send 1 email
      if (this.receipientList.length == 0) {
        alert('No user has been chosen!')
      }

      // Send many email
      else {
        this.receipientList.forEach(email => {
          let content = Mustache.render(this.content, email);
          let data = {
            application: "spam-mailer",
            receipient: email.email,
            subject: this.subject,
            content: content,
            queueTime: new Date().toISOString().split(".")[0],
            sent: false
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

        // Reset state
        this.addedUser = false;
        this.advisorName = "";
        this.subject = "";
        this.content = "";
        this.submitted = false;
        this.receipientList = [];
        this.advisors = [];
      }
    },
    
    newEmail() {
      this.submitted = false;
    },

    addReceipient() {
      this.addedUser = true;
      let fullname = this.advisorName;
      if (fullname == "") {
        alert('Choose advisor name first!')
      } else {
        let index = this.receipientList.findIndex(receopient => receopient.fullname == fullname);
        let exist = index >= 0 ? true : false;
        
        if (!exist) {
          index = this.advisors.findIndex(advisor => advisor.fullname == fullname);
          this.receipientList.push(this.advisors[index]);
        }

        this.advisorName = "";
      }
    },

    removeReceipient(e) {
      console.log(e.target.value);
      let index = this.receipientList.findIndex(receipient => receipient.email == e.target.value);
      this.receipientList.splice(index, 1);
    },

    getAllUsers() {
      UserDataService.request(
        "http://localhost:8000/advisors/",
        "GET"
      ).then(response => {
        this.advisors = response.data;
      }).catch(err => {
        console.error(err);
      })
    },
  },

  mounted() {
    if (!this.$store.state.LoggedIn) {
      this.$router.push('/sign-in');
      return;
    }
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
  padding: 10px;
  min-width: 300px;
  align-self: flex-start;
  margin-left: 20px;
  position: relative;
}
.receiver_list {
  display: grid;
  grid-template-columns: auto;
  min-width: max-content;
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

.advisorEmail {
  border: 1px solid #333;
  border-radius: 6px;
  background-color: #007bff;
  color: #fff;
  padding: 6px 10px 8px 10px;
}

.btn {
  border-radius: 6px;
}
</style>
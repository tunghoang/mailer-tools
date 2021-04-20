<template>
  <div v-if="currentEmail" class="edit-form">
    <h4>Email</h4>
    
    <form>
      <div class="form-group">
        <label for="receiver">Receiver</label>
        <input type="text" class="form-control" id="receiver"
          v-model="currentEmail.receipient"
        />
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" class="form-control" id="subject"
          v-model="currentEmail.subject"
        />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" id="content"
          v-model="currentEmail.content"
        />
      </div>

      <div class="form-group">
        <label for="compose-at">Queue Time</label>
        <input type="text" class="form-control" id="compose-at"
          v-model="currentEmail.queueTime"
        />
      </div>

      <div class="form-group">
        <label for="sent-at">Sent at</label>
        <input type="text" class="form-control" id="sent-at"
          v-model="currentEmail.sentTime"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentEmail.sent ? "Sent" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-primary btn-sm mr-2"
      v-if="currentEmail.sent"
      @click="updateSent(false)"
    >
      Resent
    </button>
    <!-- <button v-else class="btn btn-primary btn-sm mr-2"
      @click="updateSent(true)"
    >
      Sent
    </button> -->

    <button class="btn btn-danger btn-sm mr-2"
      @click="deleteEmail"
    >
      Delete
    </button>

    <a class="btn btn-success btn-sm"
      @click="updateEmail" :href="'/'"
    >
      Update
    </a>
    <p>{{ message }}</p>

  </div>

  <div v-else>
    <br />
    <p>Please click on a email...</p>
  </div>
</template>

<script>
import EmailDataService from "../../services/EmailDataService";

export default {
  name: "email",
  data() {
    return {
      currentEmail: null,
      message: ''
    };
  },
  methods: {
    getEmail(id) {
      console.log(id);  
      EmailDataService.get(id)
        .then(response => {
          this.currentEmail = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSent(status) {
      var data = {
        idMail: this.currentEmail.idMail,
        receipient: this.currentEmail.receiver,
        subject: this.currentEmail.subject,
        content: this.currentEmail.content,
        queueTime: new Date().toISOString().split(".")[0],
        sent: false
      };

      EmailDataService.update(this.currentEmail.idMail, data)
        .then(response => {
          this.currentEmail.sent = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateEmail() {
      EmailDataService.update(this.currentEmail.idMail, this.currentEmail)
        .then(response => {
          console.log(response.data);
          this.message = 'The email was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteEmail() {
      EmailDataService.delete(this.currentEmail.idMail)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "ListEmail" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (!this.$store.state.LoggedIn) {
      this.$router.push('/sign-in');
      return;
    }
    this.message = '';
    this.getEmail(this.$route.params.id);
  }
};
</script>

<style scoped>
.edit-form {
  width: 70%;
  margin: auto;
}

.btn {
  color: #fff;
}
</style>
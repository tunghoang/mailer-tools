<template>
  <div v-if="currentEmail" class="edit-form">
    <h4>Email</h4>
    
    <form>
      <div class="form-group">
        <label for="receiver">Receiver</label>
        <input type="text" class="form-control" id="receiver"
          v-model="currentEmail.receiver"
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
        <label for="compose-at">Compose at</label>
        <input type="text" class="form-control" id="compose-at"
          v-model="currentEmail.composeAt"
        />
      </div>

      <div class="form-group">
        <label for="sent-at">Sent at</label>
        <input type="text" class="form-control" id="sent-at"
          v-model="currentEmail.sentAt"
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
      Unsent
    </button>
    <button v-else class="btn btn-primary btn-sm mr-2"
      @click="updateSent(true)"
    >
      Sent
    </button>

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
        id: this.currentEmail.id,
        receiver: this.currentEmail.receiver,
        subject: this.currentEmail.subject,
        content: this.currentEmail.content,
        composeAt: this.currentEmail.composeAt,
        sentAt: this.currentEmail.sentAt,
        sent: status
      };

      EmailDataService.update(this.currentEmail.id, data)
        .then(response => {
          this.currentEmail.sent = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateEmail() {
      EmailDataService.update(this.currentEmail.id, this.currentEmail)
        .then(response => {
          console.log(response.data);
          this.message = 'The email was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteEmail() {
      EmailDataService.delete(this.currentEmail.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "emails" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getEmail(this.$route.params.id);
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
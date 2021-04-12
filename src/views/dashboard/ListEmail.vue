<template>
  <div class="list_email row d-flex justify-content-center">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by subject"
          v-model="subject"/>
        <div class="input-group-append">
          <button class="btn bg-primary text-white" type="button"
            @click="searchSubject"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div>
      <h2>Email Lists</h2>

      <div class="button">

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllEmails">
        Remove All
      </button>

      <input type="text" class="form-control" placeholder="Search by receiver"
         v-model="searchReceiver" />

      </div>
      <table class="table table-striped table-hover" :style="{width: '900px'}">
        <thead class="thead-inverse thead-dark">
          <tr>
            <th>ID</th>
            <th>Receiver</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Queue at</th>
            <th>Sent at</th>
            <th>Sent status</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          <tr 
          v-for="(email, index) in resultReceiver"
          :key="index" 
          >
            <td>{{index}}</td>
            <td>{{email.receiver}}</td>
            <td>{{email.subject}}</td>
            <td class="wrap">{{email.content}}</td>
            <td>{{email.composeAt}}</td>
            <td>{{email.sentAt}}</td>
            <td>{{email.sent}}</td>
            <div :style="{margin: '10px'}">
              <a class="btn btn-info btn-sm" :href="'/emails/' + email.id">Edit</a>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EmailDataService from "../../services/EmailDataService";

export default {
  name: "emails-list",
  data() {
    return {
      emails: [],
      subject: "",
      searchReceiver: null
    };
  },
  methods: {
    retrieveEmails() { //get all email
      EmailDataService.getAll()
        .then(response => {
          this.emails = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() { // refresh list whenever removing all emails
      this.retrieveEmails();
    },

    removeAllEmails() { //delete all emails
      let emails = this.resultReceiver;
      emails = emails.map(email => email.id)
      emails.forEach(email => {
        EmailDataService.delete(email) //* get res done!
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      })

    },
    
    searchSubject() { //search by subject
      EmailDataService.findBySubject(this.subject)
        .then(response => {
          this.emails = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  
  computed: {
    resultReceiver() {
      if (this.searchReceiver) {
        const res = this.emails.filter((email)=> this.searchReceiver.toLowerCase().split(' ')
                                          .every(v => email.receiver.toLowerCase().includes(v))
        )
        return res
        } else {
          return this.emails;
        }
      }
  },
  mounted() {
    this.retrieveEmails();
  }
};
</script>

<style scoped>
.list_email {
  text-align: left;
  /* max-width: 750px; */
  /* padding: 20px; */
}

.button button {
  height: 40px;
  text-align: center;
}

.wrap {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
}

</style>
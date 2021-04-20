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

      <input type="text" class="form-control" placeholder="Search by receipient"
         v-model="searchReceiver" />

      </div>
      <table class="table table-striped table-hover" :style="{width: '900px'}">
        <thead class="thead-inverse thead-dark">
          <tr>
            <th>ID</th>
            <th>Receipient</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Queue at</th>
            <th>Sent at</th>
            <th>Sent</th>
            <th style="min-width:75px;">Actions</th>
          </tr>
        </thead>
        <tbody >
          <tr 
          v-for="(email, index) in resultReceiver"
          :key="index" 
          >
            <td>{{index}}</td>
            <td class="wrap">{{email.receipient}}</td>
            <td class="wrap">{{email.subject}}</td>
            <td class="wrap">{{email.content}}</td>
            <td>{{email.queueTime}}</td>
            <td>{{email.sentTime}}</td>
            <td>{{email.sent}}</td>
            <div :style="{margin: '10px'}">
              <a class="v-icon mdi mdi-email-send-outline"
                data-toggle="tooltip" data-placement="bottom" title="Resend" 
                @click="reSend(email.idMail)"
              ></a>
              <a class="v-icon mdi mdi-square-edit-outline"
                data-toggle="tooltip" data-placement="bottom" title="Edit"
                :href="'/pages/emails/' + email.idMail"
              ></a>
            </div>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <ul class="pagination-btn">
        <li>
          <button type="button" :class="['btn btn-primary' ]" value="prev"
          @click="changePage" :disabled="this.currentPage == 0 ? true : false">
            Previous
          </button>
        </li>

        <li>
          <button type="button" :class="'btn btn-primary'" value="next"
          @click="changePage" :disabled="this.currentPage >= (this.allMails.length / this.mailsPerPage - 1) ? true : false ">
            Next
          </button>
        </li>
      </ul>
      <div class="ml-6 mb-4">{{ this.currentPage * this.mailsPerPage }}-{{ this.currentPage * this.mailsPerPage + this.mailsPerPage }} of {{ this.allMails.length }}</div>
    </div>
  </div>
</template>

<script>
import EmailDataService from "../../services/EmailDataService";
import Cookies from 'js-cookie';

export default {
  name: "emails-list",
  data() {
    return {
      allMails: [],
      emails: [],
      subject: "",
      searchReceiver: null,
      currentPage: 0,
      mailsPerPage: 10
    };
  },
  methods: {
    // Get all email
    retrieveEmails() { 
      EmailDataService.getAll()
        .then( async (response) => {
          this.allMails = response.data;
          await this.allMails.sort(function(a, b) {
            if (a.sentTime == null) return -1;
            else if (b.sentTime == null) return 1;
            else {
              let sentTimeA = new Date(a.sentTime).getTime();
              let sentTimeB = new Date(b.sentTime).getTime();
              return sentTimeB - sentTimeA;
            }
          });
          this.emails = this.allMails.slice(0, this.mailsPerPage);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() { // refresh list whenever removing all emails
      this.retrieveEmails();
    },

    removeAllEmails() { //delete all emails
      let email = this.resultReceiver;
      email = email.map(e => e.idMail)
      email.forEach(e => {
        EmailDataService.delete(e) //* get res done!
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      })

    },
    
    // Search by subject
    searchSubject() {
      let subjectToSearch = this.subject == "" ? {} : { subject: this.subject }
      EmailDataService.findBySubject(subjectToSearch)
        .then(response => {
          this.allMails = response.data;
          console.log(response.data);
          this.paginate();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Set sent status to false
    reSend(idMail) {
      EmailDataService.update(idMail, { sent: false })
      .then(response => {
        console.log(response);
        let foundIndex = this.emails.findIndex(mail => mail.idMail == idMail)
        this.emails[foundIndex].sent = false;
      })
    },

    // Pagination
    paginate() {
      this.currentPage = 0;
      let indexMail = this.currentPage * this.mailsPerPage;
      this.emails = this.allMails.slice(indexMail, indexMail + this.mailsPerPage);
    },

    // Change page
    changePage(e) {
      if (e.target.value == "prev") {
        console.log('Prev');
        this.currentPage--;
        let mailStart = this.currentPage * this.mailsPerPage;
        this.emails = this.allMails.slice(mailStart, mailStart + this.mailsPerPage)
      } else if (e.target.value == "next") {
        console.log('Next');
        this.currentPage++;
        let mailStart = this.currentPage * this.mailsPerPage;
        this.emails = this.allMails.slice(mailStart, mailStart + this.mailsPerPage)
      }
    }
  },
  
  computed: {
    resultReceiver() {
      if (this.searchReceiver) {
        let res = this.allMails.filter((email)=> this.searchReceiver.toLowerCase().split(' ')
                                          .every(v => email.receipient.toLowerCase().includes(v))
        )
        return res;
      } else {
        return this.emails;
      }
    }
  },

  mounted() {
    if (Cookies.get('jwt') == null || Cookies.get('key') == null) {
      this.$router.push('/sign-in');
      return;
    }
    this.retrieveEmails();
  }
};
</script>

<style scoped>
.list_email {
  text-align: left;
  flex-direction: column;
  align-items: center;
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

.btn {
  color: #fff;
}

.pagination-btn {
  display: flex;
  list-style: none;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination-btn li {
  margin: 0 2px;
}

</style>
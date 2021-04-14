import http from "../http-common";

const EmailDataService = {
  getAll: function() {
    return http.get("/__db-mailer/mails/");
  },

  get: function(id) {
    return http.put(`/__db-mailer/mails/${id}`, { idMail: id });
  },

  create: function(data) {
    return http.post("/__db-mailer/mails/", data);
  },

  update: function(id, data) {
    return http.put(`/__db-mailer/mails/${id}`, data);
  },

  delete: function(id) {
    return http.delete(`/__db-mailer/mails/${id}`);
  },

  deleteInTable: function(res) {
    const listId = res.map(e => e.id)
    console.log(listId)
  },

  findBySubject: function(subject) {
    return http.put(`/__db-mailer/mails/`, subject);
  }
}

export default EmailDataService;
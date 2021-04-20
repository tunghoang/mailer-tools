import { http } from "../http-common";

const EmailDataService = {
  getAll: function() {
    return http.get("/mails/");
  },

  get: function(id) {
    return http.put(`/mails/${id}`, { idMail: id });
  },

  create: function(data) {
    return http.post("/mails/", data);
  },

  update: function(id, data) {
    return http.put(`/mails/${id}`, data);
  },

  delete: function(id) {
    return http.delete(`/mails/${id}`);
  },

  deleteInTable: function(res) {
    const listId = res.map(e => e.id)
    console.log(listId)
  },

  findBySubject: function(subject) {
    return http.put(`/mails/`, subject);
  }
}

export default EmailDataService;
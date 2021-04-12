import http from "../http-common";

const EmailDataService = {
  getAll: function() {
    return http.get("/emails");
  },

  get: function(id) {
    return http.get(`/emails/${id}`);
  },

  create: function(data) {
    return http.post("/emails", data);
  },

  update: function(id, data) {
    return http.put(`/emails/${id}`, data);
  },

  delete: function(id) {
    return http.delete(`/emails/${id}`);
  },

  deleteInTable: function(res) {
    const listId = res.map(e => e.id)
    console.log(listId)
  },

  findBySubject: function(subject) {
    return http.get(`/emails?subject=${subject}`);
  }
}

export default EmailDataService;
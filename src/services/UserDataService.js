import http from "../http-common";

const UserDataService = {
  getAll: function() {
    return http.get("/users");
  },

  get: function(id) {
    return http.get(`/users/${id}`);
  },
}

export default UserDataService;
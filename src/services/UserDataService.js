import axios from 'axios';

const UserDataService = {
  request: function(url, method = "GET", body = null , headers = null) {
    return axios({
      method: method,
      url: url,
      data: body,
      headers: headers,
      withCredentials: true
    });
  },
}

export default UserDataService;
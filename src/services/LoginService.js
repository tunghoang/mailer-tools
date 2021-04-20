import axios from 'axios';

const LoginService = {
    request: function(url, method = "GET", data = null , headers = null) {
        return axios(url, {
            method,
            data,
            headers,
            withCredentials: true
        });
    }
}

export default LoginService;
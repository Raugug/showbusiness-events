import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/auth',
      withCredentials: true
    });
  }

  signup = (username, password, password2, email, placeType, latitude, longitude) => {
    console.log("EN SIGNUP SERVICE", username, password, password2, email, placeType, latitude, longitude)
    return this.service.post('/signup', {username, password, password2, email, placeType, latitude, longitude})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default AuthService;
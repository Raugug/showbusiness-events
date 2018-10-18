import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  signup = (username, password, password2, email, photo, placeType, address, latitude, longitude) => {
    console.log("EN SIGNUP SERVICE", username, password, password2, email, photo, placeType, address, latitude, longitude)

    const formData = new FormData();
    formData.append("username", username)
    formData.append("password", password)
    formData.append("password2", password2)
    formData.append("email", email)
    formData.append("photo", photo)
    formData.append("placeType", placeType)
    formData.append("address", address)
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)

    console.log('DEBUG formData', formData.get("photo"));
    return this.service.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    //return this.service.post('/signup', {username, password, password2, email, placeType, photo, latitude, longitude})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/auth/logout',)
    .then(response => response.data)
  }
}

export default AuthService;
import axios from 'axios';

class EventService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/events',
      withCredentials: true
    });
  }

  create = (title, place, description, artist, date, type) => {
    console.log("EN EVENT SERVICE", title, place, description, artist, date, type)
    /* return this.service.post('/create', {title, place, description, artist, date, type})
    .then(response => response.data) */
  }

  /* login = (username, password) => {
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
  } */
}

export default EventService;
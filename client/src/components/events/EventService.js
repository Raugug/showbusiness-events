import axios from 'axios';

class EventService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/event',
      withCredentials: true
    });
  }

  create = (title, description, artist, artistURL, video, date, time, type, place) => {
    console.log("EN EVENT SERVICE", title, description, artist, artistURL, video, date, time, type, place)
    return this.service.post('/create', {title, description, artist, artistURL, video, date, time, type, place})
    .then(response => response.data)
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
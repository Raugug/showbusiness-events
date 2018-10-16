import axios from 'axios';
import moment from 'moment';

class _EventService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/event',
      withCredentials: true
    });
  }

  create = (title, description, artist, photo, artistURL, video, date, datestr, time, price, type, place) => {
    console.log("EN EVENT SERVICE", title, description, artist, photo, artistURL, video, date, datestr, time, price, type, place)

    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    formData.append("artist", artist)
    formData.append("photo", photo)
    formData.append("artistURL", artistURL)
    formData.append("video", video)
    formData.append("date", date)
    formData.append("datestr", datestr)
    formData.append("time", time)
    formData.append("price", price)
    formData.append("type", type)
    formData.append("place", place)

    console.log('DEBUG formData', formData.get("photo"));
    return this.service.post('/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    //return this.service.post('/create', {title, description, artist, artistURL, video, date, time, type, place})
    .then(response =>response.data)
  }

  getall = () => {
    return this.service.get('/all')
    .then(response => response.data)
  }
  

  getEvent = (id) => {
    return this.service.get(`/${id}`)
    .then(response => response.data)
  }
  /* 

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  } */
}

export const EventService = new _EventService()


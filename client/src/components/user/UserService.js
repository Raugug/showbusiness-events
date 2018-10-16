import axios from 'axios';

class _UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/user',
      withCredentials: true
    });
  }

  edit = (id, username, email, placeType) => {
      console.log("En METODO EDIT", username, email, placeType)
    return this.service.put(`/edit`, { id, username, email, placeType})
    .then(response => response.data)
  }
  getuser = (id) => {
    console.log("id En METODO GET", id)
    return this.service.get(`/${id}`)
    .then(response => response.data)

  }

  joinevent = (id, eventId) => {
    console.log("service joinevent", id, eventId)
    return this.service.put(`/add/joinevent`, {id, eventId})
    .then(response => response.data)
  }

  favuser = (id, favId) => {
    console.log("service favuser", id, favId)
    return this.service.put(`/add/favuser`, {id, favId})
    .then(response => response.data)
  }

  followplace = (id, placeId) => {
    console.log("service followplace", id, placeId)
    return this.service.put(`/add/followplace`, {id, placeId})
    .then(response => response.data)
  }

  unjoinevent = (id, eventId) => {
    console.log("service unjoinevent", id, eventId)
    return this.service.put(`/delete/joinevent`, {id, eventId})
    .then(response => response.data)
  }

  unfavuser = (id, favId) => {
    console.log("service unfavuser", id, favId)
    return this.service.put(`/delete/favuser`, {id, favId})
    .then(response => response.data)
  }

  unfollowplace = (id, placeId) => {
    console.log("service unfollowplace", id, placeId)
    return this.service.put(`/delete/followplace`, {id, placeId})
    .then(response => response.data)
  }
}

export const UserService = new _UserService();
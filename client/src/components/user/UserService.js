import axios from 'axios';

class _UserService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  edit = (id, username, email, placeType) => {
    return this.service.put(`/user/edit`, { id, username, email, placeType})
    .then(response => response.data)
  }
  getuser = (id) => {
    return this.service.get(`/user/${id}`)
    .then(response => response.data)

  }

  joinevent = (id, eventId) => {
    return this.service.put(`/user/add/joinevent`, {id, eventId})
    .then(response => response.data)
  }

  favuser = (id, favId) => {
    return this.service.put(`/user/add/favuser`, {id, favId})
    .then(response => response.data)
  }

  followplace = (id, placeId) => {
    return this.service.put(`/user/add/followplace`, {id, placeId})
    .then(response => response.data)
  }

  unjoinevent = (id, eventId) => {
    return this.service.put(`/user/delete/joinevent`, {id, eventId})
    .then(response => response.data)
  }

  unfavuser = (id, favId) => {
    return this.service.put(`/user/delete/favuser`, {id, favId})
    .then(response => response.data)
  }

  unfollowplace = (id, placeId) => {
    return this.service.put(`/user/delete/followplace`, {id, placeId})
    .then(response => response.data)
  }
  getplaces = () => {
    return this.service.get(`/user/places/all`).then(response => response.data)
  }

  getplacesbytype = (placeType) => {
    return this.service.get(`/user/places/${placeType}`)
    .then(response => response.data)

  }
}

export const UserService = new _UserService();
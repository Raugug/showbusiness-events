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
}

export const UserService = new _UserService();
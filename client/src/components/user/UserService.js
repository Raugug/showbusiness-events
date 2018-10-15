import axios from 'axios';

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/user',
      withCredentials: true
    });
  }

  edit = (id, username, email) => {
      console.log("En METODO EDIT", username, email)
    return this.service.put(`/edit`, { id, username, email})
    .then(response => response.data)
  }
}

export default UserService;
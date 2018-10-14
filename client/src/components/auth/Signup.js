import React, { Component } from 'react';
import AuthService from './AuthService'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', password2: '', email:'', photo: null, placeType: 'User', address: '', latitude: 0, longitude: 0, message: ''};
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.password2;
    const email = this.state.email;
    const photo = this.state.photo;
    const placeType = this.state.placeType;
    const address =  this.state.address; 
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;

    console.log("PHOTO EN HS", photo)

    this.service.signup(username, password, password2, email, photo, placeType, address, latitude, longitude)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            password2: "",
            email: "",
            photo: null,
            message: response.message
        });
        console.log(this.state.message)
        this.props.getUser(response.user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  handleChangePhoto = (event) => {
    this.setState({
      photo: event.target.files[0]
    })
  }
      

  render() {
    return(
      <div>
        <h3>Create your account to see the best events</h3>
        <p>{this.state.message}</p>
        <form onSubmit={this.handleFormSubmit}>
          <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} class="form-control" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} class="form-control" />
          </div>

          <div class="form-group">
            <label>Repeat Password</label>
            <input type="password" name="password2" value={this.state.password2} onChange={e => this.handleChange(e)} class="form-control" />
          </div>

          <div class="form-group">
            <label for="email"> Email </label>
            <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} class="form-control" />
          </div>

          <div class="form-group">
            <label for="photo">Profile Picture</label>
            <input type="file" name="photo" id="photo" onChange={e => this.handleChangePhoto(e)} class="form-control" />
          </div>
          
          <button class="btn btn-success"> Sign Up </button>
        </form>

      </div>
    )
  }
}

export default Signup;
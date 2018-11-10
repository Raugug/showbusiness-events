import React, { Component } from 'react';
import AuthService from './AuthService'
import MyMap from '../maps/MyMap'

class Signuplocal extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', password2: '', email:'', photo: '', placeType:'', address: '', latitude: '', longitude: ''};
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
    const address = this.state.address;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;

    this.service.signup(username, password, password2, email, photo, placeType, address, latitude, longitude)
    .then( response => {
      this.props.updateMap()
        this.setState({
            username: "", 
            password: "",
            password2: "",
            email: "",
            photo: "",
            placeType: "",
            address: "",
            latitude: "",
            longitude: ""
        });
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

  getLocation = (lat, long) => {
    let copy = {lat: lat, long: long}
    this.setState({latitude: copy.lat, longitude: copy.long})
    

  }
      

  render() {
    return(
      <div>
        
        <h3>Create your local account:</h3>

        <form onSubmit={this.handleFormSubmit}>
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} class="form-control"/>
        </div>
          
          <div class="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} class="form-control"/>
          </div>

          <div class="form-group">
            <label>Repeat Password</label>
            <input type="password" name="password2" value={this.state.password2} onChange={ e => this.handleChange(e)} class="form-control"/>
            </div>

          <div class="form-group">
            <label for="email"> Email </label>
            <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} class="form-control"/>
          </div>

          <div class="form-group">
            <label for="photo">Profile Picture</label>
            <input type="file" name="photo" id="photo" onChange={e => this.handleChangePhoto(e)} class="form-control" />
          </div>

          <div class="form-group">
            <label for="placeType">Type of local</label>
            <select name="placeType" onChange={ e => this.handleChange(e)} class="form-control">
              <option disabled selected value> -- select an option -- </option>
              <option value="Bar">Bar</option>
              <option value="Theater">Theater</option>
              <option value="Club">Club</option>
              <option value="Cafe">Coffee shop</option>
            </select>
          </div>

          <div class="form-group">
            <label>Address</label>
            <input type="text" name="address" value={this.state.address} onChange={ e => this.handleChange(e)} class="form-control"/>
        </div>

          <div class="form-group">
            <input id="lat-pos" type="hidden" name="latitude" value={this.state.latitude} onChange={ e => this.handleChange(e)} />
            <input id="lng-pos" type="hidden" name="longitude" value={this.state.longitude} onChange={ e => this.handleChange(e)} />
          </div>

          <div class="form-group">
            <label for="map">Location</label>
            <div>
            <MyMap
              id="myMap"
              options={{
                center: { lat: 40.3827563, lng: -3.692763 },
                zoom: 14
              }}
              
              getLoc={this.getLocation}
            />
            </div>

          </div>
          
          <button class="btn btn-success"> Sign Up </button>
        </form>
        <script src="../maps/addMap.js"></script>

      </div>
    )
  }
}

export default Signuplocal;
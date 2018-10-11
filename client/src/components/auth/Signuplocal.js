import React, { Component } from 'react';
import AuthService from './AuthService'
import SimpleMap from '../maps/Map'
import MyMap from '../maps/MyMap'

class Signuplocal extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', password2: '', email:'', placeType:'', latitude: '', longitude: ''};
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.password2;
    const email = this.state.email;
    const placeType = this.state.placeType;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;

    this.service.signup(username, password, password2, email, placeType, latitude, longitude)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            password2: "",
            email: "",
            placeType: "",
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

  getLocation = (lat, long) => {
    console.log("LATLONG", lat, long)
    let copy = {lat: lat, long: long}
    //let copy = !this.state.isOn 
    this.setState({latitude: copy.lat, longitude: copy.long})
    //console.log("STATE", this.state)

  }
      

  render() {
    console.log("STATE EN RENDER", this.state)
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
            <input id="lat-pos" type="hidden" name="latitude" value={this.state.latitude} onChange={ e => this.handleChange(e)} />
            <input id="lng-pos" type="hidden" name="longitude" value={this.state.longitude} onChange={ e => this.handleChange(e)} />
          </div>

          <div class="form-group">
            <label for="map">Location</label>
            {/* <SimpleMap getLoc={this.getLocation}/> */}
            <div>
            <MyMap
              id="myMap"
              options={{
                center: { lat: 40.3827563, lng: -3.692763 },
                zoom: 10
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
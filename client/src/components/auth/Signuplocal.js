import React, { Component } from 'react';
import AuthService from './AuthService'
import Map from '../maps/Map'

class Signuplocal extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', password2: '', type:'', latitude: '', longitude: ''};
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.password2;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;

    this.service.signup(username, password, password2, latitude, longitude)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            password2: "",
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
      

  render() {
    return(
      <div>
        
        <h3>Create your local account:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Repeat Password:</label>
            <input type="password" name="password2" value={this.state.password2} onChange={ e => this.handleChange(e)} />
          </fieldset>

          <div class="form-group">
            <label for="level-input">Type of local</label>
            <select name="type" class="form-control">
              <option value="Bar" selected>Bar</option>
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
            <Map />
          </div>

          
          <input type="submit" value="Sign up" />
        </form>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRIT2iw6rPE6wpIGJK2jfCsKYmMcEXfUc"></script>
        <script src="../maps/addMap.js"></script>

      </div>
    )
  }
}

export default Signuplocal;
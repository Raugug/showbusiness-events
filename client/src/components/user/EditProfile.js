import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Profile.scss';
import PlaceMap from './PlaceMap'
import UserService from './UserService'
//import Profile from './Profile';
import { Redirect } from 'react-router'
//import { Switch, Route } from 'react-router-dom';


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state = this.props.user
        this.state.redirect = false;
        this.state.error = false;

        this.service = new UserService();

        console.log(this.state)
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const id = this.state._id;
        const username = this.state.username;
        const email = this.state.email;
        const placeType = this.state.placeType;
    
        this.service.edit(id, username, email, placeType)
          .then(response => {
            this.setState({
              redirect: true
            });
            console.log("RESP EDIT", response)
            this.props.update(response)
          })
          .catch(error => {
            this.setState({
              id: id,
              username: username,
              email: email,
              placeType: placeType,
              redirect: false,
              error: true
            });
          })
      }
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      } 


    render(){
        console.log("STATE EN RENDER", this.state)
        let {username, password, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, location} = this.state
        if(this.state.redirect){
            return <Redirect to='/profile'/>;
          }
        if (placeType==="User")
        return (<div>
            <h3>Edit your data</h3>
      
            <form onSubmit={this.handleFormSubmit}>
              <div class="form-group">
                  <label>Username</label>
                  <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} class="form-control" />
              </div>
      
              <div class="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} class="form-control" />
              </div>
      
              <button class="btn btn-warning"> EDIT </button>
            </form>
      
            <h1>{this.state.error ? 'Error' : ''}</h1>
            
          </div>)
        else
        return (<div>
            <h3>Edit your place data</h3>
      
            <form onSubmit={this.handleFormSubmit}>
              <div class="form-group">
                  <label>Placename</label>
                  <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} class="form-control" />
              </div>
      
              <div class="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} class="form-control" />
              </div>

                <div class="form-group">
                    <label for="placeType">Type of local</label>
                    <select name="placeType" onChange={e => this.handleChange(e)} class="form-control">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="Bar">Bar</option>
                        <option value="Theater">Theater</option>
                        <option value="Club">Club</option>
                        <option value="Cafe">Coffee shop</option>
                    </select>
                </div>
      
              <button class="btn btn-warning"> EDIT </button>
            </form>
      
            <h1>{this.state.error ? 'Error' : ''}</h1>
            
          </div>)
        
    }
}

export default EditProfile;

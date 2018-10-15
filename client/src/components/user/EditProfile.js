import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Profile.scss';
import PlaceMap from './PlaceMap'
import UserService from './UserService'
import { Redirect } from 'react-router'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = this.props.getUser
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
    
        this.service.edit(id, username, email)
          .then(response => {
            this.setState({
              id: id,
              username: username,
              email: email,
              redirect: true
            });
    
            this.props.getUser(response)
          })
          .catch(error => {
            this.setState({
              id: id,
              username: username,
              email: email,
              redirect: false,
              error: true
            });
          })
      }
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

     /*  componentWillUpdate(){
          this.setState
      } */


    render(){
        console.log("STATE EN RENDER", this.state)
        let {username, password, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, location} = this.state
        if(this.state.redirect){
            return <Redirect to='/profile' getUser={this.state.loggedInUser}/>;
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
        return (
            <div className="main-profile">
                <div className="content-profile">
                    <div className="left-profile-place">
                        <img src={photo} alt=""/>
                        <h4>{username}</h4>
                        <h4>{email}</h4>
                        <h4>{placeType}</h4>
                        <h4>{address}</h4>
                    </div>
                    <div className="rigth-profile">
                        
                        
                        {location ? <PlaceMap
                        id="placeMap"
                        options={{
                            center: { lat: location.coordinates[0], lng: location.coordinates[1] },
                            zoom: 15
                        }}
                        adr={address} />: <div/>}
                    </div>

                </div>
                        <button class="btn btn-warning"><Link to='/user/edit'>EDIT</Link></button>
                
                <div className="list-profile">
                    <hr/>
                    <h1>Program</h1>
                    <hr/>
                    <ul className="eventsList">
                        <li>Evento</li>
                        <li>Evento 2</li>
                    </ul>
                    <hr/>
                    
                    <hr/>
                    <h1>Followers</h1>
                    <hr/>
                    <ul className="eventsList">
                        <li>User 1</li>
                        <li>User 2</li>
                    </ul>
                </div>
                

            </div>

        )
        
    }
}

export default Profile;

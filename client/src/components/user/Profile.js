import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        let {username, password, email, photo, placeType, eventsHost, eventsGo, favUsers, favPlaces, location} = this.props.getUser
        return(
            <div className="profile">
                <h1>Profile Page</h1>
                <img src={photo} alt=""/>
                <button class="btn btn-secondary"><NavLink to='/user/edit'>EDIT</NavLink></button>
                <h2>{username}</h2>
                <h3>{email}</h3>
                { placeType==="User"?
                <div>
                    <h2>My Events: </h2>
                    <ul className="eventsList">
                        <li>Evento</li>
                        <li>Evento2</li>
                    </ul>
                </div>
                :<div></div>}

            </div>
        )
    }
}

export default Profile;

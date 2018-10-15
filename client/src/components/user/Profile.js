import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Profile.scss';
import PlaceMap from './PlaceMap'
import { Switch, Route } from 'react-router-dom';
import EditProfile from './EditProfile';
import UserService from './UserService'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {}
        
        this.service = new UserService();
    }

    componentWillReceiveProps(){
        const state = this.props.getUser
        this.setState({state})
        console.log("RECIEVE", state)
    }
    componentWillMount(){
        this.service.getuser(this.props.user._id).then(response => {
            this.setState(response)})
        //this.setState({state})
        console.log("WILLMOUNT", this.state)

    }

    componentDidMount(){
        const state = this.props.getUser
        this.setState({state})
        console.log("DIDMOUNT", state)

    }

    render(){
        console.log("props EN RENDER", this.props)
        let {username, password, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, location} = this.props.user
        if (placeType==="User")
        return(
            <div className="main-profile">
                <div className="content-profile">
                    <div className="left-profile">
                        <img src={photo} alt=""/>
                    </div>
                    <div className="rigth-profile">
                        <h3>{username}</h3>
                        <h3>{email}</h3>
                        <button class="btn btn-warning"><Link to='/user/edit'>EDIT</Link></button>
                        
                    </div>

                </div>
                
                <div className="list-profile">
                    <hr/>
                    <h1>My Events</h1>
                    <hr/>
                    <ul className="eventsList">
                        <li>Evento</li>
                        <li>Evento 2</li>
                    </ul>
                    <hr/>
                    <h1>My Places</h1>
                    <hr/>
                    <ul className="placesList">
                        <li>Place 1</li>
                        <li>Place 2</li>
                    </ul>
                    <hr/>
                    <h1>My Friends</h1>
                    <hr/>
                    <ul className="favsList">
                        <li>User 1</li>
                        <li>User 2</li>
                    </ul>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/INtBu0RNDn8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                
            <Route exact path='/user/edit' render={() => <EditProfile updated getUser={this.state.loggedInUser}/>}/>
            </div>
        )
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
                
{/*                 <Route exact path='/user/edit' render={() => <EditProfile updated getUser={this.state.loggedInUser}/>}/>
 */}            </div>

        )
        
    }
}

export default Profile;

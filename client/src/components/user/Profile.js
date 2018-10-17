import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Profile.scss';
import PlaceMap from './PlaceMap'
import { Switch, Route } from 'react-router-dom';
import EditProfile from './EditProfile';
import {UserService} from './UserService';
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {username:'', password:'', email:'', photo:'', placeType:'',
                      address:'', eventsHost:[], eventsGo: [], favUsers:'', favPlaces:'', location:''}
        this.service = UserService;
        if(this.props.id){
            this.service.getuser(this.props.id).then(response => this.setState(response))
        }
        console.log("PROPS En CONSTRUCTOR", this.props.id, this.props.user)
    }

    componentWillReceiveProps(){
        const state = this.props.user
        this.setState(state)
        console.log("RECIEVE", this.state)
    }
    componentWillMount(){
        const state = this.props.user
        
        this.setState(state)
        console.log("WILLMOUNT", this.state)

    }

    componentDidMount(){
        const state = this.props.user
        this.setState(state)
        console.log("DIDMOUNT", this.state)
    }

    render(){
        console.log("state EN RENDER", this.state)
        let {username, password, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, location} = this.state
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
                        {(!this.props.id)?
                        <Link to='/user/edit'>EDIT</Link>:<div/>}
                        
                    </div>

                </div>
                
                <div className="list-profile">
                    <hr/>
                    <h1>My Events</h1>
                    <hr/>
                    <ul className="eventsList">
                        {eventsGo.map(event =>{
                            return  <li >
                                    <div className="eventInList">
                                        <div>
                                        <Icon icon={calendar}/><p>{event.datestr}</p>
                                        <Icon icon={clock}/><p>{event.time}</p>
                                        </div>
                                        <Link to={"/event/"+event._id}>{event.title}</Link>
                                    </div>
                                    </li>

                        })}
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
                </div>
                
            {/* <Route exact path='/user/edit' render={() => <EditProfile updated getUser={this.state.loggedInUser}/>}/> */}
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
                {!this.props.id ? <button class="btn btn-warning"><Link to='/user/edit'>EDIT</Link></button>:<br/>}
                
                <div className="list-profile">
                    <hr/>
                    <h1>Program</h1>
                    <hr/>
                    <ul className="eventsList">
                        {eventsHost.map(event =>{
                            return  <li >
                                    <div className="eventInList">
                                        <div>
                                        <Icon icon={calendar}/><p>{event.datestr}</p>
                                        <Icon icon={clock}/><p>{event.time}</p>
                                        </div>
                                        <Link to={"/event/"+event._id}>{event.title}</Link>
                                    </div>
                                    </li>

                        })}
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

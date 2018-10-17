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
                      address:'', eventsHost:[], eventsGo: [], favUsers:[], favPlaces:[], location:''}
        this.service = UserService;
        /* if(this.props.match.params.id){
            this.service.getuser(this.props.id).then(response => this.setState(response))
        }
        console.log("PROPS En CONSTRUCTOR", this.props.id, this.props.user) */
    }

    componentWillReceiveProps(){debugger;
        if(this.props.id){
            this.service.getuser(this.props.id).then(response => this.setState(response))
        }
        else{
        
        const state = this.props.user
        this.setState(state)
        console.log("RECIEVE", this.state)
        }
    }
    // componentWillMount(){debugger;
    //     if(this.props.id){
    //         this.service.getuser(this.props.id).then(response => this.setState(response))
    //     }
    //     else{

    //         const state = this.props.user
            
    //         this.setState(state)
    //         console.log("WILLMOUNT", this.state)
    //     }

    // }
    /* componentWillUpdate(){
        debugger
        if(this.props.type==="standard"){
            this.setState({name: "dani"})
        }
        if(this.props.type==="specific"){
            this.setState({name: "raul"})
        }
    } */

    componentDidMount(){
        debugger;

        if(this.props.id){
            this.service.getuser(this.props.id).then(response => this.setState(response))
        }
        else{
        const state = this.props.user
        this.setState(state)
        console.log("DIDMOUNT", this.state)
        }
    }

    handleFav = (e) => {
        e.preventDefault();
        UserService.favuser(this.props.user._id, this.props.id).then(response => {
            console.log("response favuser", response)
            this.props.update(response.user)
            this.setState(response.userfollowed);
        })
    }
    handleUnfav = (e) => {
        e.preventDefault();
        UserService.unfavuser(this.props.user._id, this.props.id).then(response => {
            console.log("response UNfavuser", response)
            this.props.update(response.user)
            this.setState(response.userfollowed);
        })
    }

    redirect = (e, id) => {
        debugger
        this.service.getuser(id).then(response => this.setState(response))
    }

    render(){
        
        console.log("state EN RENDER", this.state)
        let {username, password, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, location} = this.state
        let isInFavUsers =this.props.user.favUsers.filter(userfav => {return (userfav._id===this.props.id)})
        if (placeType==="User")
        return(
            <div className="main-profile">
            <p>{this.props.type}</p>
                <div className="content-profile">
                    <div className="left-profile">
                        <img src={photo} alt=""/>
                    </div>
                    <div className="rigth-profile">
                        <h3>{username}</h3>
                        <h3>{email}</h3>
                        {(!this.props.id)?
                        <Link to='/user/edit'>EDIT</Link>:<div/>}
                        {(isInFavUsers.length === 0) ?
                        <div className="buttons">
                            <button class="btn btn-success" onClick={(e) => this.handleFav(e)}>FOLLOW</button>
                        </div>
                        :
                        <div className="buttons">
                            <button class="btn btn-danger" onClick={(e) => this.handleUnfav(e)}>UNFOLLOW</button>
                        </div>
                    }
                        
                    </div>

                </div>
                
                <div className="list-profile">
                    <hr/>
                    <h1>Events Going</h1>
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
                                        <Link to={"/place/"+event.place._id}>{event.place.username}</Link>
                                    </div>
                                    </li>

                        })}
                    </ul>
                    <hr/>
                    <h1>Favourite Places</h1>
                    <hr/>
                    <ul className="placesList">
                        <li>Place 1</li>
                        <li>Place 2</li>
                    </ul>
                    <hr/>
                    <h1>Favourite Users</h1>
                    <hr/>
                    <ul className="favsList">
                    {favUsers.map(user =>
                        <li>
                            <img src={user.photo} alt=""/>
                            <h4><Link onClick={() =>this.props.updateProfileType("specific")} to={"/user/"+user._id}>{user.username}</Link></h4>
                        </li>
                        
                        )}
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
                                        <Link to={"/place/"+event.place._id}>{event.place.username}</Link>

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

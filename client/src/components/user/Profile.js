import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';
import PlaceMap from './PlaceMap'
import {UserService} from './UserService';
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'
import {user} from 'react-icons-kit/icomoon/user'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { _id:'', username:'', password:'', email:'', photo:'', placeType:'',
                      address:'', eventsHost:[], eventsGo: [], favUsers:[], favPlaces:[], followPlaces:[], location:''}
        this.service = UserService;
        if(this.props.id){
            this.service.getuser(this.props.id).then(response => this.setState(response))
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.type==="specific"){
            this.service.getuser(nextProps.id).then(response => 
                 this.setState(response)
                )
                
            }else {
                    
                let state = this.props.user
                this.setState(state)
            }
    }
    componentDidMount(){
        if(this.props.type==="specific"){
            this.service.getuser(this.props.id).then(response => 
                 this.setState(response)
                )
                
            }else {
                    
                let state = this.props.user
                this.setState(state)
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

    handleFavplace = (e) => {
        e.preventDefault();
        UserService.followplace(this.props.user._id, this.props.id).then(response => {
            console.log("response followplace", response)
            this.props.update(response.user)
            this.setState(response.placefollowed);
        })
    }
    handleUnfavplace = (e) => {
        e.preventDefault();
        UserService.unfollowplace(this.props.user._id, this.props.id).then(response => {
            console.log("response UNfollowplace", response)
            this.props.update(response.user)
            this.setState(response.placefollowed);
        })
    }

    redirect = (e, id) => {
        //debugger
        this.service.getuser(id).then(response => this.setState(response))
    }
    compareEvents = (a,b) => {
        if (a.datestr < b.datestr)
        return -1;
        if (a.datestr > b.datestr)
        return 1;
        if (a.datestr === b.datestr){
            if (a.time < b.time)
            return -1;
            if (a.time > b.time)
            return 1;
            return 0;
        }
    }

    render(){
        let {username, email, photo, placeType, address, eventsHost, eventsGo, favUsers, favPlaces, followPlaces, location} = this.state
        let isInFavUsers =this.props.user.favUsers.filter(userfav => {return (userfav._id===this.props.id)})
        let isInFavPlaces =this.props.user.favPlaces.filter(placefav => {return (placefav._id===this.props.id)})
        //let isInFollowPlaces =this.props.user.followPlaces.filter(placefollowers => {return (placefollowers._id===this.props.id)})
        let eventsGoOrdered = eventsGo.sort(this.compareEvents);

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
                        
                        {(isInFavUsers.length === 0) ?
                        
                        <div className="buttons">
                            {this.props.type!=="standard" ? <button class="btn btn-success" onClick={(e) => this.handleFav(e)}>FOLLOW</button>:<div/>}
                        </div>
                        :
                        <div className="buttons">
                            {this.props.type!=="standard" ? <button class="btn btn-danger" onClick={(e) => this.handleUnfav(e)}>UNFOLLOW</button>:<div/>}
                        </div>
                    }
                        
                    </div>

                </div>
                
                <div className="list-profile">
                    <hr/>
                    <h1>Events Going</h1>
                    <hr/>
                    <ul className="eventsList">
                        {eventsGoOrdered.map(event =>{
                            return  <li >
                                    <div className="eventInList">
                                        
                                        <Icon icon={calendar}/><p>{event.datestr}</p>
                                        <Icon icon={clock}/><p>{event.time}</p>
                                        
                                        <Link to={"/event/"+event._id}>{event.title}</Link>
                                        <Icon icon={user}/><p>{event.joined.length} </p>

                                    </div>
                                    <hr/> 
                                    </li>

                        })}
                    </ul>
                    <hr/>
                    <h1>Favourite Places</h1>
                    <hr/>
                    <ul className="favsList">
                    {favPlaces.map(user =>
                        <li>
                            <img src={user.photo} alt=""/>
                            <h4><Link onClick={() =>this.props.updateProfileType("specific")} to={"/place/"+user._id}>{user.username}</Link></h4>
                        </li>
                        
                        )}
                    </ul>
                    <hr/>
                    <h1>Favourite Users</h1>
                    <hr/>
                    <ul className="favsList">
                    {favUsers.map(user =>
                        <li>
                            <img src={user.photo} alt=""/>
                            
                            {this.props.user._id!==user._id ?
                            <h4><Link onClick={() =>this.props.updateProfileType("specific")} to={"/user/"+user._id}>{user.username}</Link></h4>
                            :
                            <h4><Link onClick={() =>this.props.updateProfileType("standard")} to={"/profile"}>{user.username}</Link></h4>
                            }
                            </li>
                        
                        )}
                    </ul>
                </div>
            </div>
        )
        else {

        let eventsHostOrdered = eventsHost.sort(this.compareEvents);        
        return (
            <div className="main-profile">
                <div className="content-profile">
                    <div className="left-profile-place">
                        <img src={photo} alt=""/>
                        <h4>{username}</h4>
                        <h4>{email}</h4>
                        <h4>{placeType}</h4>
                        {(isInFavPlaces.length === 0) ?
                        
                        <div className="buttons">
                            <button class="btn btn-success" onClick={(e) => this.handleFavplace(e)}>FOLLOW</button>
                        </div>
                        :
                        <div className="buttons">
                            <button class="btn btn-danger" onClick={(e) => this.handleUnfavplace(e)}>UNFOLLOW</button>
                        </div>
                    }
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
                        {eventsHostOrdered.map(event =>{
                            return  <li >
                                    <div className="eventInList">
                                        
                                        <Icon icon={calendar}/><p>{event.datestr}</p>
                                        <Icon icon={clock}/><p>{event.time}</p>
                                        <Link to={"/event/"+event._id}><span>{event.title}</span></Link>
                                        <Icon icon={user}/><p>{event.joined.length} </p>

                                    </div>
                                    <hr/>
                                    </li>

                        })}
                    </ul>
                    <hr/>
                    
                    <hr/>
                    <h1>Followers ({followPlaces.length})</h1>
                    <hr/>
                    <ul className="favsList">
                    {followPlaces.map(user =>
                        <li>
                            <img src={user.photo} alt=""/>
                            <h4><Link onClick={() =>this.props.updateProfileType("specific")} to={"/user/"+user._id}>{user.username}</Link></h4>
                        </li>
                        
                        )}
                    </ul>
                </div>
                
            </div>

        )}
        
    }
}

export default Profile;

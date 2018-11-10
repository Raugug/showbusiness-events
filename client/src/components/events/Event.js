import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.scss';
import {EventService} from './EventService'
import {UserService} from '../user/UserService'
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'
import PlaceMap from '../user/PlaceMap'


class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', description:'', artist:'', photo:'', artistURL:'', 
                      video:'', date:'', datestr:'', time:'', price:'', type:'', place:'', joined:[]}
        this.service = EventService;
    }

    componentWillMount(){
        this.service.getEvent(this.props.id).then((event) =>
        {
            this.setState(event)
        })

    }
    handleJoin = (e) => {
        e.preventDefault();
        UserService.joinevent(this.props.user._id, this.props.id).then(response => {
            this.props.update(response.user)
            this.setState(response.event);
        })
    }
    handleLeave = (e) => {
        e.preventDefault();
        UserService.unjoinevent(this.props.user._id, this.props.id).then(response => {
            this.props.update(response.user)
            this.setState(response.event);
        })
    }

    render (){
        let {title, description, artist, photo, artistURL, video, datestr, time, price, place, joined} = this.state;
        let isInJoined =this.state.joined.filter(userjoined => {return (userjoined._id===this.props.user._id)})
        return(
            <div className="main-event">
                <div className="header-event">
                    <div className="header-left">
                        <img src={photo} alt=""></img>
                    </div>
                    <div className="header-right">
                        <h1>{title}</h1>
                        <h3>by</h3>
                        <h1><a href={"http://"+artistURL} target="_blank" rel="noopener noreferrer">{artist}</a></h1>
                        {(isInJoined.length === 0) ?
                        <div className="buttons">
                            <button class="btn btn-success" onClick={(e) => this.handleJoin(e)}>JOIN</button>
                        </div>
                        :
                        <div className="buttons">
                            <button class="btn btn-danger" onClick={(e) => this.handleLeave(e)}>LEAVE</button>
                        </div>
                    }
                    </div>
                </div>
                <div className="content-event">
                    <h3>Information</h3>
                    <hr/>
                    <p>{description}</p>
                    <br/>
                    <div className="datetime">
                        <div><Icon icon={calendar}/><p>{datestr}</p></div>
                        <div><Icon icon={clock}/><p>{time}</p></div>
                    </div>
                    
                    <div className="content-profile">
                    <div className="left-profile-place">
                        <img src={place.photo} alt=""/>
                        <h4><Link to={"/place/"+place._id}>{place.username}</Link></h4>
                        <h4>{place.address}</h4>
                        <h4>{place.placeType}</h4>
                        <h4>{place.email}</h4>
                    </div>
                    <div className="rigth-profile">
                        
                        
                        {place.location ? <PlaceMap
                        id="placeMap"
                        options={{
                            center: { lat: place.location.coordinates[0], lng: place.location.coordinates[1] },
                            zoom: 15
                        }}
                        adr={place.address} />: <div/>}
                    </div>

                </div>
                    <h3>Tickets</h3>
                    <hr/>
                    <div className="tickets">
                    <p>PRICE: {price}</p>
                    <button className="btn btn-primary">BUY</button>
                    </div>
                    <hr/>
                    <iframe width="560" height="315" src={"//www.youtube.com/embed/"+video} 
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    <h3>Users joined</h3>
                    <hr/>
                    <ul className="favsList">
                    {joined.map(user =>
                        <li>
                            <img src={user.photo} alt=""/>
                            <h4><Link to={"/user/"+user._id}>{user.username}</Link></h4>
                        </li>
                        
                        )}
                    </ul>
               
                </div>
            </div>   
        )
    }
}

export default Event;


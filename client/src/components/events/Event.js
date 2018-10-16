import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Event.scss';
//import PlaceMap from './PlaceMap'
import { Redirect } from 'react-router'
import {EventService} from './EventService'
import { EPROTO } from 'constants';
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'
import PlaceMap from '../user/PlaceMap'


class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', description:'', artist:'', photo:'', artistURL:'', video:'', date:'', datestr:'', time:'', price:'', type:'', place:''}
        this.service = EventService;
    }

    componentWillMount(){
        console.log("PROPS EN DETAIL", this.props.id)
        this.service.getEvent(this.props.id).then((event) =>
        {

            console.log("EVENT", event)
            this.setState(event)
        })
        console.log("STATE EN CONST", this.state)

    }

    render (){
        let {title, description, artist, photo, artistURL, video, date, datestr, time, price, type, place} = this.state;
        console.log("PLACE", artist)
        return(
            <div className="main-event">
                <div className="header-event">
                    <div className="header-left">
                        <img src={photo}></img>
                    </div>
                    <div className="header-right">
                        <h1>{title}</h1>
                        <h3>by</h3>
                        <h1>{artist}</h1>
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
                    <iframe width="560" height="315" src={"//www.youtube.com/embed/"+video} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    <h3>Users joined</h3>
                    <hr/>
                    <ul className="favsList">
                        <li>User 1</li>
                        <li>User 2</li>
                    </ul>
                


                </div>
            </div>
            
        )
    }
}



export default Event;


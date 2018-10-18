import React, { Component } from 'react';
import {EventService} from './EventService';
//import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ListEvent.scss'
//import Event from './Event'
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'


class ListEvents extends Component {
    constructor(props){
        super(props);
        this.state = {events:[]};
        this.service = EventService;
        
    }

    getList = () => {
        this.service.getall()
      .then( response => {
          console.log(response)
          this.setState({events: response.events});
      })
      .catch( error => console.log(error)) 

    }
    componentWillMount (){
        this.getList();
    }
    render(){
        console.log("STATE LIST", this.state.events)
        const events = this.state.events
        return(
            <div className="eventsList">
            
                    <ul >
                        <li >
                        <div className="eventInList">
                            <div>#</div>
                            <div>EVENT</div>
                            <div>TYPE</div>
                            <div>DATE</div>
                            <div>PLACE</div>
                            </div>
                        </li>
                        {events.map(event =>{
                            return  <li >
                                    <hr/>
                                    <div className="eventInList">
                                        <img src={event.photo} alt=""></img>
                                        <Link to={"/event/"+event._id}>{event.title}</Link>
                                        <p>{event.type}</p>
                                        <div>    
                                        <Icon icon={calendar}/><p>{event.datestr}</p>
                                        <Icon icon={clock}/><p>{event.time}</p>
                                        </div>
                                        <Link to={"/place/"+event.place._id}>{event.place.username}</Link>
                                    </div>
                                    </li>

                        })}
                    </ul>
            
            </div>
            )
    }
}

export default ListEvents;
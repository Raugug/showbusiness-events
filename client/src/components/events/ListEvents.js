import React, { Component } from 'react';
import {EventService} from './EventService';
import { Link } from 'react-router-dom';
import './ListEvent.scss'
import Icon from 'react-icons-kit';
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {clock} from 'react-icons-kit/icomoon/clock'


class ListEvents extends Component {
    constructor(props){
        super(props);
        this.state = {events:[], eventsweek: [], all:true};
        this.service = EventService;  
    }

    getList = () => {
        this.service.getall()
      .then( response => {
          this.setState({events: response.events});
      })
      .catch( error => console.log(error)) 
    }

    getListWeek = () => {
        this.service.getweek()
      .then( response => {
          this.setState({eventsweek: response.events});
      })
      .catch( error => console.log(error)) 
    }

    componentWillMount (){
        this.getList();
        this.getListWeek();
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

    typeSort= (e, events) =>{
        e.preventDefault();
        let typeSorted = events.sort((a,b) => { if(a.type < b.type) return -1;
                                                if(a.type > b.type) return 1;
                                                return 0;})
        this.state.all ? this.setState({events: typeSorted}) : this.setState({eventsweek: typeSorted})
    }
    timeSort= (e, events) =>{
        e.preventDefault();
        let timeSorted = events.sort(this.compareEvents)
        this.state.all ? this.setState({events: timeSorted}) : this.setState({eventsweek: timeSorted})
    }

    placeSort= (e, events) =>{
        e.preventDefault();
        let placeSorted = events.sort((a,b) => { if(a.place.username < b.place.username) return -1;
                                                 if(a.place.username > b.place.username) return 1;
                                                 return 0;})
        this.state.all ? this.setState({events: placeSorted}) : this.setState({eventsweek: placeSorted})
    }
    priceSort= (e, events) =>{
        e.preventDefault();
        let priceSorted = events.sort((a,b) => {return (a.price.slice(0, -1) - b.price.slice(0, -1))})
        this.state.all ? this.setState({events: priceSorted}) : this.setState({eventsweek: priceSorted})
    }
    nameSort= (e, events) =>{
        e.preventDefault();
        let nameSorted = events.sort((a,b) => { if(a.title < b.title) return -1;
                                                if(a.title > b.title) return 1;
                                                return 0;})
        this.state.all ? this.setState({events: nameSorted}) : this.setState({eventsweek: nameSorted})
    }
    joinedSort= (e, events) =>{
        e.preventDefault();
        let joinedSorted = events.sort((a,b) => {return (this.calculateJoined(b) - this.calculateJoined(a))})
        this.state.all ? this.setState({events: joinedSorted}) : this.setState({eventsweek: joinedSorted})
    }

    calculateJoined = (event) => {
        return event.joined.length;
    }

    allSort= (e, events) =>{
        e.preventDefault();
        this.setState({all: true})
    }
    weekSort= (e, events) =>{
        e.preventDefault();
        this.setState({all: false})
    }


    render(){
        const events = this.state.all ? this.state.events : this.state.eventsweek;
        return(
            <div className="eventsList">
            
                    <ul >
                    <li >
                        <div className="eventInList">
                            <button class="btn btn-light" onClick={(e)=>{this.weekSort(e, events)}}>THIS WEEK</button>
                            <button class="btn btn-light" onClick={(e)=>{this.allSort(e, events)}}>ALL</button>
                            </div>
                        </li>
                        <li >
                        <div className="eventInList">
                            <button class="btn btn-info" >#</button>
                            <button class="btn btn-info" onClick={(e)=>{this.nameSort(e, events)}}>EVENT</button>
                            <button class="btn btn-info" onClick={(e)=>{this.typeSort(e, events)}}>TYPE</button>
                            <button class="btn btn-info" onClick={(e)=>{this.priceSort(e, events)}}>PRICE</button>
                            <button class="btn btn-info" onClick={(e)=>{this.joinedSort(e, events)}}>JOINED</button>
                            <button class="btn btn-info" onClick={(e)=>{this.timeSort(e, events)}}>DATE</button>
                            <button class="btn btn-info" onClick={(e)=>{this.placeSort(e, events)}}>PLACE</button>
                            </div>
                        </li>
                        {events.map(event =>{
                            return  <li >
                                    <hr/>
                                    <div className="eventInList">
                                        <img src={event.photo} alt=""></img>
                                        <Link to={"/event/"+event._id}>{event.title}</Link>
                                        <p>{event.type}</p>
                                        <p>{event.price}</p>
                                        <p>{this.calculateJoined(event)}</p>
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
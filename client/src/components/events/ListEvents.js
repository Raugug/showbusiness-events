import React, { Component } from 'react';
import {EventService} from './EventService';
import { Switch, Route } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './ListEvent.scss'
import Event from './Event'


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
            <div className="listall">
                <ul>
                    {events.map( e => {
                        return(
                            <li>
                                <div>
                                    <a href={"/event/"+e._id} >{e.title}</a>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
                <Route exact path={"event/:id"} render={(props)=> <Event id={props.match.params.id} events={this.state.events}/>}/>
            </div>
        )
    }
}

export default ListEvents;
import React, { Component } from 'react';
import EventService from './EventService'
import './ListEvent.scss'


class ListEvents extends Component {
    constructor(props){
        super(props);
        this.state = {events:[]};
        this.service = new EventService();
        
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
                                    <a href="" >{e.title}</a>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default ListEvents;
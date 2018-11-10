import React, { Component } from 'react';
import {UserService} from './UserService';
import { Link } from 'react-router-dom';
import '../events/ListEvent.scss';


class ListPlaces extends Component {
    constructor(props){
        super(props);
        this.state = {places:[]};
        
    }
    getPlacesList = (placeType) => {
            UserService.getplacesbytype(placeType)
            .then( response => {
              this.setState({places: response});
            })
            .catch( error => console.log(error)) 
    }

    getList = () => {
        this.service.getall()
      .then( response => {
          this.setState({events: response.events});
      })
      .catch( error => console.log(error)) 

    }
    componentWillReceiveProps(nextProps) {
        this.getPlacesList(nextProps.placeType);
    }

    componentWillMount() {
        this.getPlacesList(this.props.placeType);
    }

    followers = (place) => place.followPlaces.length

    render(){
        const places = this.state.places
        return(
            <div className="eventsList">
            
                    <ul >
                        <li >
                        <div className="eventInList">
                            <div>#</div>
                            <div>PLACE</div>
                            <div>FOLLOWERS</div>
                            <div>ADDRESS</div>
                            </div>
                        </li>
                        {places.map(place =>{
                            return  <li >
                                    <hr/>
                                    <div className="eventInList">
                                        <img src={place.photo} alt=""></img>
                                        <Link to={"/place/"+place._id}>{place.username}</Link>
                                        <p>{this.followers(place)}</p>
                                        <p>{place.address}</p>
                                        
                                    </div>
                                    </li>

                        })}
                    </ul>
            
            </div>
            )
    }
}

export default ListPlaces;
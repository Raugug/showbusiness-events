import React, { Component } from 'react';
import {EventService} from '../events/EventService';
import InfoWindow from './InfoWindow';
import { Link } from 'react-router-dom';


class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ title: "Marker", position: { lat: '', lng: '' }}],
      places:[],
      events:[]
    };
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.getList();
    
  }

  getList = () => {
    EventService.getall()
  .then( response => {
      this.setState({events: response.events});
  })
  .catch( error => console.log(error)) 

  }

  componentWillMount (){
    this.setState({places: this.props.places})
    this.getList();
  }
  componentWillReceiveProps (nextProps){
    this.setState({places: nextProps.places})
  }

  

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.onMapLoad(map)
  }
  onMapLoad = (map) => {
    let bounds = new window.google.maps.LatLngBounds();

    let marker

    this.state.places.map(place => {

        marker = new window.google.maps.Marker({
        position: { lat: place.location.coordinates[0], lng: place.location.coordinates[1] },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: `${place.username} - ${place.address}`
      });
      if (place.placeType === "Bar"){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');}
      if (place.placeType === "Club"){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');}
      if (place.placeType === "Theater"){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');}
      if (place.placeType === "Cafe"){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png');}
      //marker.addListener('click', animation);
      marker.addListener('click', e => {
        this.createInfoWindow(e, map, place)})
      

      bounds.extend(marker.position);
    })
    map.fitBounds(bounds);

    const animation = () => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    };

  }
  createInfoWindow = (e, map, place) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: `<img src='${place.photo}' style="width:250px;border-radius:10%">
        <a href="/place/${place._id}"><h4 style="color: green;text-shadow: 0px 0px">${place.username} - ${place.placeType}</h4></a>
        <h4 style="color: red;">${place.followPlaces.length} followers || ${place.eventsHost.length} events</h4>`,

        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
       document.getElementById('infoWindow')
    })
    infoWindow.open(map)
  }
  
  componentDidMount() {
    this.getList();
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=YOUR_API_KEY`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
    
        <div style={{ width: '80%', height: '80vh' }} id={this.props.id}><InfoWindow
        
        /></div>
    );
  }
}

export default MainMap
import React, { Component } from 'react';
import {EventService} from '../events/EventService';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ title: "Marker", position: { lat: '', lng: '' }}],
      events:[]
    };
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.getList();
    console.log("props en constructor", this.props)
    
  }

  getList = () => {
    EventService.getall()
  .then( response => {
      console.log(response)
      this.setState({events: response.events});
  })
  .catch( error => console.log(error)) 

  }

  componentWillMount (){
    this.getList();
}

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.onMapLoad(map)
  }
  onMapLoad = (map) => {
    console.log("EN MAPLOAD", this.props)
    let bounds = new window.google.maps.LatLngBounds();

    let marker
    this.props.events.map(event=>{
        console.log("EN MAP", event)
        marker = new window.google.maps.Marker({
        position: { lat: event.place.location.coordinates[0], lng: event.place.location.coordinates[1] },
        map: map,
        title: `${event.title}`
      });
      //console.log("MARKER", marker)
    })
    bounds.extend(marker.position);
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
      console.log("STATE EN RENDER", this.state)
    return (
      <div style={{ width: '80%', height: '80vh' }} id={this.props.id} />
    );
  }
}

export default MainMap
import React, { Component } from 'react';
//import { render } from 'react-dom';
import geolocalize from './geolocalize'

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker:
        {
          title: "Marker",
          position: { lat: '', lng: '' }
        }
    };
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.onMapLoad(map)
  }
  onMapLoad = (map) => {
    let marker;
    let clickPos= {
      lat:0,
      lng:0
    };
      map.addListener('click', (e) => {
        clickPos = {
          lat:e.latLng.lat(),
          lng:e.latLng.lng()
        }
        console.log(clickPos);
        marker.setPosition(clickPos);
        this.props.getLoc(clickPos.lat, clickPos.lng)

      });

      geolocalize().then(center => {
        map.setCenter(center);
        marker = new window.google.maps.Marker({
          position: center,
          map: map
        });
        marker.setPosition(clickPos);
        this.props.getLoc(clickPos.lat, clickPos.lng)
      marker.setPosition(clickPos);
      this.setState({
        marker:
          {
            title: "Marker",
            position: { lat: clickPos.lat, lng: clickPos.lng }
          }
      })
        console.log("MARKER: ", this.state.marker);
      });

        /* let marker = new window.google.maps.Marker({
          position: { lat: clickPos.lat, lng: clickPos.long },
          map: map,
          title: 'Hello!'
        }); */
      
      /* this.props.getLoc(clickPos.lat, clickPos.lng)
      //marker.setPosition(clickPos);
      this.setState({
        marker:
          {
            title: "Marker",
            position: { lat: clickPos.lat, lng: clickPos.lng }
          }
      }) */
    //});

    
  }

  componentDidMount() {
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
      <div style={{ width: 500, height: 500 }} id={this.props.id} />
    );
  }
}

export default MyMap
import React, { Component } from 'react';
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
      });    
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=YOUR_API_KEY`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
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
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import Marker from 'google-map-react';
import geolocalize from './geolocalize'

 
const Marker = props => {
    return <div className="Marker"><img src='http://maps.google.com/mapfiles/ms/icons/red-dot.png' alt="ALT"/>
            </div>
  }
 
class SimpleMap extends Component {
    static defaultProps = {
        center: {
          lat: 40.3827563,
          lng: -3.692763
        },
        zoom: 12
    };
    constructor(props) {
        super(props);
        
        this.state = {
            marker:
              {
                title: "Marker",
                position: { lat: '', lng: '' }
              }
        };
        this.onClick = this.onClick.bind(this);
      }
      onClick = ({x, y, lat, lng, event}) => {
          this.props.getLoc(lat, lng)
          this.setState({
            marker:
              {
                title: "Marker",
                position: { lat: lat, lng: lng }
              }
          });
        };
        setPosOnForm = (lat, lng) => {
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('lat-pos').value = lat;
                document.getElementById('lng-pos').value = lng;
            }, false);
        
        }
  

 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCRIT2iw6rPE6wpIGJK2jfCsKYmMcEXfUc'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.onClick}
        >
            <Marker
            lat={this.state.marker.position.lat}
            lng={this.state.marker.position.lng}
            title={'COSAS'}
            />
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
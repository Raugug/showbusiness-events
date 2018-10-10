import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';
//import Marker from 'google-maps-react';
import geolocalize from './geolocalize'

 
//const Marker = ({ text }) => <div>{text}</div>;
 
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
          markers: [
            {
              title: "Marker",
              name: "Name",
              position: { lat: 40.3827563, lng: -3.692763 }
            }
          ]
        };
        this.onClick = this.onClick.bind(this);
      }
    
      onClick(t, map, coord) {
          console.log("COORD IN ONCLICK", coord);
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
    
        this.setState(previousState => {
          return {
            markers: [
              ...previousState.markers,
              {
                title: "",
                name: "",
                position: { lat, lng }
              }
            ]
          };
        });
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
        {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
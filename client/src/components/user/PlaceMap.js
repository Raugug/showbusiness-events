import React, { Component } from 'react';

class PlaceMap extends Component {
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
    let marker = new window.google.maps.Marker({
        position: this.props.options.center,
        map: map,
        title: this.props.adr
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
      <div style={{ width: 480, height: 390 }} id={this.props.id} />
    );
  }
}

export default PlaceMap
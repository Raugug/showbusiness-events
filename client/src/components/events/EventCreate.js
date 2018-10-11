import React, { Component } from 'react';
import EventService from './EventService'


class EventCreate extends Component {
    constructor(props){
      super(props);
      this.state = { title: '', description: '', artist: '', date:'', type:'', place:''};
      this.service = new EventService();
    }
      
    handleFormSubmit = (event) => {
      event.preventDefault();
      const {title, description, artist, date, type} = this.state;
      const place = this.props.getUser
  
      this.service.create(title, place, description, artist, date, type)
      .then( response => {
          this.setState({title: '', description: '', artist: '', date:'', type:'', place:''});
          //this.props.getUser(response.user)
      })
      .catch( error => console.log(error) )
    }
  
    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    }
        
  
    render() {
      return(
        <div>
          <h3>Add an Event to your Program</h3>
  
          <form onSubmit={this.handleFormSubmit}>
            <div class="form-group">
              <label>Title</label>
              <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} class="form-control" />
            </div>

            <div class="form-group">
              <label>Artist</label>
              <input type="text" name="artist" value={this.state.artist} onChange={e => this.handleChange(e)} class="form-control" />
            </div>

            <div class="form-group">
            <label for="placeType">Type</label>
            <select name="placeType" onChange={ e => this.handleChange(e)} class="form-control">
              <option disabled selected value> -- select an option -- </option>
              <option value="Concert">Concert</option>
              <option value="Standup">Stand Up</option>
              <option value="Play">Play</option>
              <option value="Session">DJ Session</option>
            </select>
            </div>
  
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" name="description" rows="5" value={this.state.password} onChange={e => this.handleChange(e)}></textarea>
            </div>
            
            <button class="btn btn-success"> Create </button>
          </form>
  
        </div>
      )
    }
  }
  
  export default EventCreate;
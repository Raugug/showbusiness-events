import React, { Component } from 'react';
import EventService from './EventService'


class EventCreate extends Component {
    constructor(props){
      super(props);
      this.state = { redirect: false, title: '', description: '', artist: '', artistURL:'', video:'', date:'', time:'', type:'', place:this.props.getUser._id };
      this.service = new EventService();
    }
      
    handleFormSubmit = (event) => {
      event.preventDefault();
      let {title, description, artist, artistURL, video, date, time, type, place} = this.state;
      //const place = this.props.getUser
  
      this.service.create(title, description, artist, artistURL, video, date, time, type, place)
      .then( response => {
          this.setState({redirect: false, title: '', description: '', artist: '', artistURL:'',video:'', date:'', time:'', type:'', place:this.props.getUser._id});
          console.log("EVENT CREATED IN FRONT", response.event)
      })
      .catch( error => console.log(error) )
    }
  
    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
      //console.log("STATE IN FORM CHANGE FUNC", this.state)
    }
        
  
    render() {
      console.log("STATE IN FORM AFTER CHANGE", this.state)
      if(!this.state.redirect){

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
              <label>Artist Site Link</label>
              <input type="text" name="artistURL" value={this.state.artistURL} onChange={e => this.handleChange(e)} class="form-control" />
            </div>

            <div class="form-group">
              <label>Youtube Link</label>
              <input type="text" name="video" value={this.state.video} onChange={e => this.handleChange(e)} class="form-control" />
            </div>

            <div class="form-group">
              <label for="date-input">Date</label>
              <input type="date" id="mydate" name="date" value={this.state.date} onChange={e => this.handleChange(e)} placeholder="DD MM YYYY" class="form-control" />
            </div>

            <div class="form-group">
              <label for="time">Time (e.g. 10:30 PM)</label>
              <input type="time" id="appt-time" name="time"
                min="00:00" max="23:59" required class="form-control" value={this.state.time} onChange={e => this.handleChange(e)} />
            </div>

            {/* <div class="form-group">
              <label for="time-input">Time</label>
              <select name="time" class="form-control">
              <option disabled selected value> -- select an option -- </option>
                <option value="16:00">16:00</option>
                <option value="16:30">18:00</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
                <option value="00:00">00:00</option>
                <option value="00:00">00:30</option>
                <option value="00:00">01:00</option>
              </select>
            </div> */}

            <div class="form-group">
            <label for="type">Type</label>
            <select name="type" onChange={ e => this.handleChange(e)} class="form-control">
              <option disabled selected value> -- select an option -- </option>
              <option value="Concert">Concert</option>
              <option value="Standup">Stand Up</option>
              <option value="Play">Play</option>
              <option value="Session">DJ Session</option>
            </select>
            </div>
  
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" name="description" rows="3" value={this.state.password} onChange={e => this.handleChange(e)}></textarea>
            </div>
            
            <button class="btn btn-success"> Create </button>
          </form>
  
        </div>
      )
          }
          else {}
    }
  }
  
  export default EventCreate;
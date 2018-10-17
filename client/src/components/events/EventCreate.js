import React, { Component } from 'react';
import {EventService} from './EventService'
import {Link} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router'




class EventCreate extends Component {
    constructor(props){
      super(props);
      this.state = { redirect: false, title: '', description: '', artist: '', photo: null, artistURL:'', video:'',
                     date:'', datestr:'', time:'', price: '', type:'', place:this.props.getUser._id };
      this.service = EventService;
    }
      
    handleFormSubmit = (event) => {
      event.preventDefault();
      let {title, description, artist, photo, artistURL, video, date, time, price, type, place} = this.state;
      //const place = this.props.getUser
      const that = this;
  
      this.service.create(title, description, artist, photo, artistURL, video, date, date, time, price, type, place)
      .then( response => {
        console.log("RESPONSE USER EN CREATE", response.user)
        debugger
        that.props.update(response.user)
        debugger
        this.setState({
          redirect: true
        });
          /* this.setState({redirect: true, title: '', description: '', artist: '', photo: null, artistURL:'',video:'',
                         date:'', datestr: '', time:'', price:'', type:'', place:this.props.getUser._id});
          //console.log("EVENT CREATED IN FRONT", response.event) */
          console.log("EVENT CREATED IN FRONT", this.state.redirect)
      })
      .catch( error => console.log(error) )
    }
  
    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
      //console.log("STATE IN FORM CHANGE FUNC", this.state)
    }
    handleChangePhoto = (event) => {
      this.setState({
        photo: event.target.files[0]
      })
    }

    getId = (url) => {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
  
      if (match && match[2].length == 11) {
          return match[2];
      } else {
          return 'error';
      }
    }
    handleChangeVideo = (event) => {
      let myId = this.getId(event.target.value);
      this.setState({
        video: myId
      })
    }

        
  
    render() {
      console.log("STATE IN FORM AFTER CHANGE", this.state)
      if(this.state.redirect){
          return <Redirect to='/profile'/>;
        }

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
            <label for="photo">Event Photo</label>
            <input type="file" name="photo" id="photo" onChange={e => this.handleChangePhoto(e)} class="form-control" />
          </div>

            <div class="form-group">
              <label>Artist Site Link</label>
              <input type="text" name="artistURL" value={this.state.artistURL} onChange={e => this.handleChange(e)} class="form-control" />
            </div>

            <div class="form-group">
              <label>Youtube Link</label>
              <input type="text" name="video" value={this.state.video} onChange={e => this.handleChangeVideo(e)} class="form-control" />
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

            <div class="form-group">
              <label>Price</label>
              <input type="text" name="price" value={this.state.price} onChange={e => this.handleChange(e)} class="form-control" />
            </div>


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
        
            <button class="btn btn-success">CREATE</button>
          </form>
  
        </div>
      )
    }
  }
  
  export default EventCreate;
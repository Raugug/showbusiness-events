import React, { Component } from 'react';
import './App.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Signuplocal from './components/auth/Signuplocal';
import Login from './components/auth/Login';
import AuthService from './components/auth/AuthService';
import Footer from './components/navbar/Footer';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import EventCreate from './components/events/EventCreate';
import ListEvents from './components/events/ListEvents';
import Event from './components/events/Event'
import MainMap from './components/maps/MainMap'
//import {EventService} from './components/events/EventService';
import {UserService} from './components/user/UserService';
import ListPlaces from './components/user/ListPlaces';


class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null , profileType: null, loading: true};
    this.service = new AuthService();
    
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  componentWillMount(){
    this.fetchUser()
    this.getPlacesList();
  }

  updateProfileType = (profileType) => {
      this.setState({loggedInUser: this.state.loggedInUser, profileType: profileType})

  }

  update = (res) => {
    //debugger
      this.setState({loggedInUser: res})
  }
  updateMap = () => {
    this.setState({loading: true});
    this.getPlacesList();
  }
  getPlacesList = () => {
    UserService.getplaces()
    .then( response => {
      this.setState({places: response, loading: false});
    })
    .catch( error => console.log(error)) 

  }
  

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <header className="App-header">
            <Navbar update={this.update} updateProfileType={this.updateProfileType} userInSession={this.state.loggedInUser} logout={this.logout} />
          </header>
          <main className="App-main">
          <Switch>
              <Route exact path='/all' render={() => <ListEvents getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/ListTheaters' render={() => <ListPlaces placeType="Theater" getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/ListBars' render={() => <ListPlaces placeType="Bar" getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/ListCafe' render={() => <ListPlaces placeType="Cafe" getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/ListClubs' render={() => <ListPlaces placeType="Club" getUser={this.state.loggedInUser}/>}/>
              {(this.state.loading===false)?<Route exact path='/' render={() => <MainMap update={this.updateMap} places={this.state.places} id="mainMap"options={{center: { lat: 40.4167321, lng: -3.706984 }, zoom: 13}}/>}/>:<p></p>}
              <Route exact path='/newevent' render={() => <EventCreate update={this.update} getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/user/edit' render={() => <EditProfile update={this.update} user={this.state.loggedInUser}/>}/>
              <Route exact path={"/event/:id"} render={(props)=> <Event id={props.match.params.id} update={this.update} user={this.state.loggedInUser} events={this.state.events}/>}/>
              <Route exact path='/profile' render={ (props) => <Profile updateProfileType={this.updateProfileType} id={props.match.params.id} update={this.update} user={this.state.loggedInUser} type={this.state.profileType}/>}/>
              <Route exact path={"/user/:id"} render={(props)=> <Profile updateProfileType={this.updateProfileType} id={props.match.params.id} update={this.update} type={this.state.profileType} user={this.state.loggedInUser}/>}/>
              <Route exact path={"/place/:id"} render={(props)=> <Profile updateProfileType={this.updateProfileType} id={props.match.params.id} update={this.update} user={this.state.loggedInUser} type={this.state.profileType}/>}/>

            </Switch>
          </main>
          <footer>
          <Footer></Footer>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            
          </header>
          <main className="App-main">
          <Switch>
              <Route exact path='/' render={() => <div><div class="logo"><b><span>S</span>ho<span>w</span> Bu<span>s</span>ine<span>ss</span> E<span>v</span>ent<span>s</span></b></div>
                                                  <div class="sublogo"><h3>Find the best live events in the best places in town.</h3></div></div>}/>}
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/signuplocal' render={() => <Signuplocal updateMap={this.updateMap} getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
           </Switch>
          </main>
          <footer>
          <Footer></Footer>
          </footer>

        </div>
      );
    }
  }
}

export default App;
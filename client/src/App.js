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
import {EventService} from './components/events/EventService';
import {UserService} from './components/user/UserService';


class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null , profileType: null, loading: true};
    this.service = new AuthService();
    
    console.log("state en constructor", this.state)
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
    this.getList();
  }
  updateProfileType = (profileType) => {
      this.setState({loggedInUser: this.state.loggedInUser, profileType: profileType})

  }

  update = (res) => {
    debugger
      this.setState({loggedInUser: res})
  }
  getList = () => {
    EventService.getall()
  .then( response => {
      console.log("RESPONSE", response)
      this.setState({events: response.events, loading: false});
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
              {(this.state.loading===false)?<Route exact path='/' render={() => <MainMap events={this.state.events} id="mainMap"options={{center: { lat: 40.4167321, lng: -3.706984 }, zoom: 13}}/>}/>:<></>}
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
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/signuplocal' render={() => <Signuplocal getUser={this.getTheUser}/>}/>
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
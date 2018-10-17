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


class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
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
  }

  update = (res) => {
    this.setState({loggedInUser: res})

  }

  render() {
    this.fetchUser()

    if(this.state.loggedInUser){
      return (
        <div className="App">
          <header className="App-header">
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          </header>
          <main className="App-main">
          <Switch>
              <Route exact path='/all' render={() => <ListEvents getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/profile' render={() => <Profile update={this.update} user={this.state.loggedInUser}/>}/>
              <Route exact path='/newevent' render={() => <EventCreate getUser={this.state.loggedInUser}/>}/>
              <Route exact path='/user/edit' render={() => <EditProfile update={this.update} user={this.state.loggedInUser}/>}/>
              <Route exact path={"/event/:id"} render={(props)=> <Event id={props.match.params.id} update={this.update} user={this.state.loggedInUser} events={this.state.events}/>}/>
              <Route exact path={"/user/:id"} render={(props)=> <Profile id={props.match.params.id} update={this.update} user={this.state.loggedInUser}/>}/>
              <Route exact path={"/place/:id"} render={(props)=> <Profile id={props.match.params.id} update={this.update} user={this.state.loggedInUser}/>}/>

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
              <Route exact path='/profile' render={() => <Profile user={this.state.loggedInUser}/>}/>
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
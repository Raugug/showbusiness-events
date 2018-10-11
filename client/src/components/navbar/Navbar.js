import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    let user = this.state.loggedInUser;
    if (user) {
    return (
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">IMG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          { user.placeType !== "User"?
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/myprogram"> My Program <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/newevent">New Event <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/followers">Followers <span class="sr-only">(current)</span></a>
            </li>
          </ul>  
          :
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/myprogram"> My Events <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/newevent">Theaters <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/followers">Bars <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/followers">Coffee Shops <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/followers">Clubs <span class="sr-only">(current)</span></a>
            </li>
          </ul>
          }
        </div>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                PHOTO
              </a>
              <div class="dropdown-menu" style={{width:'100'}} aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/profile">Profile</a>
              </div>
            </li>
            <li class="nav-item active">
              <a class="nav-link" onClick={this.handleLogout} href="/login">Log out</a>
            </li>
          </ul>

      </nav>
    )
  } else {
    return (
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">IMG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Link <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active"><Link to='/signup' class="nav-link">Signup <span class="sr-only">(current)</span></Link></li>
            <li class="nav-item active"><Link to='/signuplocal' class="nav-link">Have a place? Signup as Place <span class="sr-only">(current)</span></Link></li>
            <li class="nav-item active"><Link to='/login' class="nav-link">Login <span class="sr-only">(current)</span></Link></li>
          </ul>  
        </div>
      </nav>
    )
  }
  }
    
}

export default Navbar;

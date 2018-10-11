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

  /* if (this.state.loggedInUser) {
    return (
      <nav className="nav-style">
        <ul>
          <li><a onClick={this.handleLogout}>Logout</a></li>
        </ul>

        <h2>Welcome, {this.state.loggedInUser.username}</h2>
      </nav>
    )
  } else {
    return (
      <div>
        <nav className="nav-style">
          <ul>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/signuplocal'>Have a place? Signup as Place</Link></li>
          <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
      </div>
    )
  } */

  render() {
    if (this.state.loggedInUser) {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">IMG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Link <span class="sr-only">(current)</span></a>
            </li>
            </ul>  
        </div>
        
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                PHOTO
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Profile</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" onClick={this.handleLogout} href="/">Log out</a>
              </div>
            </li>
          </ul>

      </nav>
    )
  } else {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">IMG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Link <span class="sr-only">(current)</span></a>
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

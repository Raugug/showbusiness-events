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
        <Link className="navbar-brand" to="/"><img src="https://res.cloudinary.com/dvd0xwpmc/image/upload/v1539530818/showbusiness/logo.png" alt="Logo"/></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          { user.placeType !== "User"?
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link className="nav-link" to="/newevent">New Event <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/myprogram"> My Program <span class="sr-only">(current)</span></a>
            </li>
          </ul>  
          :
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link className="nav-link" to="/all"> All Events <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/map">Map <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/ListTheaters">Theaters <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/ListBars">Bars <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/ListCafe">Coffee Shops <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link className="nav-link" to="/ListClubs">Clubs <span class="sr-only">(current)</span></Link>
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
              <img src={user.photo} alt="Logo"/>
               {user.username}
              </a>
              <div class="dropdown-menu" style={{width:'100'}} aria-labelledby="navbarDropdown">
              {/* <a class="dropdown-item" href="/profile">Profile</a> */}
              <Link to='/profile'  onClick={() => this.props.updateProfileType("standard")} class="dropdown-item">Profile <span class="sr-only">(current)</span></Link>
              </div>
            </li>
            
          </ul>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active" >
              <Link class="nav-link" id="logoutlink" onClick={this.handleLogout} to="/login">Log out <span class="sr-only">(current)</span></Link>
            </li>
          </ul>

      </nav>
    )
  } else {
    return (
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/"><img src="https://res.cloudinary.com/dvd0xwpmc/image/upload/v1539530818/showbusiness/logo.png" alt="Logo"/></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
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

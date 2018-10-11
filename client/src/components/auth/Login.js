import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import AuthService from './AuthService'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentWillUnmount(){
    this.setState({ username: '', password: '' })

  }

  render() {

    return (<div>
      <h3>What are you waiting for?</h3>

      <form onSubmit={this.handleFormSubmit}>
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} class="form-control" />
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} class="form-control" />
        </div>

        <button class="btn btn-success"> Log In </button>
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;
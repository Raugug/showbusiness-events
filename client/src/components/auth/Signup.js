import React, { Component } from 'react';
import AuthService from './AuthService'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', password2: ''};
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.password2;

    this.service.signup(username, password, password2)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            password2: ""
        });
        this.props.getUser(response.user)
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
        <h3>Welcome!, create your account next:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Repeat Password:</label>
            <input type="password" name="password2" value={this.state.password2} onChange={ e => this.handleChange(e)} />
          </fieldset>
          
          <input type="submit" value="Sign up" />
        </form>

      </div>
    )
  }
}

export default Signup;
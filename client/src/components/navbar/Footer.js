import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = { loggedInUser: null };
      //this.service = new AuthService();
    }

    render() {
        return (
            <section id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                        <ul class="list-unstyled list-inline social text-center">
                            <li class="list-inline-item"><a href="/"><i class="fa fa-facebook"></i></a></li>
                            <li class="list-inline-item"><a href="/"><i class="fa fa-twitter"></i></a></li>
                            <li class="list-inline-item"><a href="/"><i class="fa fa-instagram"></i></a></li>
                            <li class="list-inline-item"><a href="/"><i class="fa fa-google-plus"></i></a></li>
                            <li class="list-inline-item"><a href="/" target="_blank"><i class="fa fa-envelope"></i></a></li>
                        </ul>
                    </div>
                    <hr></hr>
                </div>	
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                        
                        <p class="h6">&copy;<a class="text-green ml-2" href="https://www.linkedin.com/in/raulguiagarcia/" >Raúl Guía García</a></p>
                    </div>
                    <hr></hr>
                </div>	
            </div>
        </section>
        )
      }
        
    }
    
    export default Footer;
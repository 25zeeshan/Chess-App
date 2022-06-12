import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import "./About.css";

export default function About(){
    return(
        <div className='About'>
            <Navigation/>

            <div className='About-content'>
                <h1>About Us</h1>

                Welcome to Chess App, your number one source for all things. We're dedicated to giving you the very best of our application, with a focus on Quality, Performance, User Experience.
                Founded in 2022 by Beware of Programmers, Chess APP has come a long way from its beginnings in Kolkata. When we first started out, our passion for Chess drove us to implement Chess move prediction algorithm. 
                <br /><br /><br />
                We hope you enjoy our application as much as we enjoyed building it. If you have any questions or comments, please don't hesitate to <Link to='/Contact' style={{ color: "magenta" }}>Contact Us</Link>.
                <br /><br />
                Sincerely,<br />
                Beware of Programmers
            </div>
        </div>
    )
}
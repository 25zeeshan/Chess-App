import React from "react";
import { NavLink } from 'react-router-dom';
import "./Navigation.css";
import NavData from './NavData';
import logo  from './Chess-logo.jpg';


export default function Navigation() {
    return (
        <div id="navigation">
            <div className="logo_container flex">
            <div className="logo">
                <img src={logo} alt="picture" />
            </div>
            </div>
            
            <ul className="NavbarList">
                {NavData.map((val, key) => {
                    return (
                        <NavLink key={key} to={val.link}> 
                        <li className="row">
                            
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        
                        </li>

                        </NavLink>
                        
                    );
                }
                )}

            </ul>
            <p className="text-base text-white mt-10 ml-2 underline underline-offset-1">Not logged in ?</p>
            <div className="flex mt-2 ml-2 ext-base text-white">
            <NavLink className="" to='/Login'>Login</NavLink>
            <p className="mx-2">or</p>
            <NavLink to='/SignUp'>Register</NavLink>
            </div>
        </div>
    );
}
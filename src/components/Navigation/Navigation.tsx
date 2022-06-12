import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import "./Navigation.css";
import NavData from './NavData';
import logo  from './Chess-logo.jpg';
import { getUserDetail } from "../../Services/User";


export default function Navigation() {

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        console.log(window.location.pathname);
        const token = localStorage.getItem('token');
        if(token){
            setUsername(localStorage.getItem('username'))
        }
    },[])

    function Logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(null);
        window.location.href = '/Login';
    }

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
                        <NavLink key={key} to={val.link} > 
                        <li className= {window.location.pathname === val.link? "row active" : "row"}>
                            
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        
                        </li>

                        </NavLink>
                        
                    );
                }
                )}

            </ul>
            {
                (username===null)?
                <div>
                    <p className="text-base text-white mt-10 ml-2 underline underline-offset-1">Not logged in ?</p>
                    <div className="flex mt-2 ml-2 ext-base text-white">
                        <NavLink className="" to='/Login'>Login</NavLink>
                        <p className="mx-2">or</p>
                        <NavLink to='/SignUp'>Register</NavLink>
                    </div>
                </div> : 
                <div>
                    <p className="text-base text-white mt-10 ml-2">Welcome ,</p>
                    <p className="text-base text-white ml-2 ">{username}</p>
                    {/*<p className="text-base text-white ml-2 underline underline-offset-1">{fullname}</p>*/}
                    <div className="text-base text-white mt-10 ml-2 logout-link" onClick={Logout}>Logout</div>
                </div>
            }
        </div>
    );
}
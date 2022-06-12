import React from 'react';
import Navigation from '../Navigation/Navigation';
import "./Contact.css";

export default function Contact(){

    function handleOnSubmit(e : any){
            e.preventDefault();
    }

    return(
        <div className="Contact">
            <Navigation />

            <div className='contact-form'>
                <h1>Contact Us</h1>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className="htmlForm-group border_bottom mb-7">
                        <label className='label' htmlFor="name"><i className="zmdi zmdi-account"></i></label>
                        <input type="text" className="w-4/5 htmlForm-control" id="name" name="name" placeholder="Enter your Name"/>
                    </div>

                    <div className="htmlForm-group border_bottom mb-7">
                        <label className='label' htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                        <input type="email" className="w-4/5 htmlForm-control" id="email" name="email" placeholder="Enter your Email@"/>
                    </div>

                    <div className="htmlForm-group border_bottom mb-7">
                        <label className='label' htmlFor="name"><i className="zmdi zmdi-phone"></i></label>
                        <input type="integer" className="w-4/5 htmlForm-control" id="phone" name="phone" placeholder="Enter your Phone Number"/>
                    </div>

                    <div className="htmlForm-group border_bottom mb-7">
                        <label className='label' htmlFor="name"><i className="zmdi zmdi-file"></i></label>
                        <input type="text" className="w-4/5 htmlForm-control" id="describe" name="describe" placeholder="Please Describe"/>
                    </div>

                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>
    );
}
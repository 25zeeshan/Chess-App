import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Login.css';


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitform = (e : any) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div className='Sectionh bg-gray-200 flex justify-center items-center '>
            <div className='container  flex bg-white  w-2/4  border-solid border-2 border-white-600 px-2 py-5 shadow-lg shadow-gray-300 rounded-[12px] outline-none'>
                <div className='left  flex-1 mr-10 text-center pb-5'>
                    <figure className='rounded-full mb-7 mt-6 '>
                        <NavLink to='/SignUp'><img width='100%' className='' src='assets/images/signup1.png' alt='picture' border-solid border-2 border-red-600 /></NavLink>
                    </figure>
                    <NavLink to='/SignUp' className="btn font-bold ml-3 hover:underline underline-offset-2">Create an Account</NavLink>
                </div>

                <div className='right  flex-1 ml-2   py-10 pr-10 '>
                    <h1 className='text-3xl mb-7 font-bold font-sans'>Sign ln</h1>
                    <form action='' onSubmit={submitform}>
                        <div className='border_bottom mb-7'>
                            <label htmlFor='first_name'><i className="zmdi zmdi-email"></i></label>
                            <input className=" " placeholder='Your Email' type="text" name="first_name" id="first_name" autoComplete='off'
                                value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>

                        <div className='border_bottom mb-3'>
                            <label htmlFor='password'><i className="zmdi zmdi-lock"></i></label>
                            <input className="" placeholder='Your Password' type="password" name="password" id="password" autoComplete='off'
                                value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className='ml-44'>
                            <NavLink to='/'><h3>forgot password?</h3> </NavLink>
                        </div>

                        <div className='mt-1'>
                            <button className=' btn py-2 px-4 bg-blue-500 text-white font-semibold  rounded-lg shadow-md hover:bg-blue-700 
                                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75' type='submit'>Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
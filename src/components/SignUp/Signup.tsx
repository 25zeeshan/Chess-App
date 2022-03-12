import React,{ useState } from "react";
import { NavLink } from 'react-router-dom';


export default function SignUp(){
    const [f_name, setF_name] = useState("");
    const [l_name, setL_name] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");

    const submitform = (e : any) => {
        e.preventDefault();
        console.log("Submit");
    }

    return (
        <div className='Section py-10  bg-gray-200'>
            <div className='container  bg-white flex  mx-auto my-6 w-3/5  border-solid border-2 border-white-600 px-20 py-10 shadow-lg shadow-gray-300 rounded-[12px] outline-none'>

                <div className='left  flex-1 mr-20'>
                    <div>
                        <h1 className='text-3xl mb-7 font-bold font-sans'>Sign up</h1>
                        <form action='' onSubmit={submitform}>
                            <div className='border_bottom mb-7'>
                                <label htmlFor='first_name'><i className="zmdi zmdi-account-o"></i></label>
                                <input className="" placeholder='Your First Name' type="text" name="first_name" id="first_name" autoComplete='off'
                                    value={f_name} onChange={(e) => { setF_name(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='last_name'><i className="zmdi zmdi-account-o"></i></label>
                                <input className="" placeholder='Your Last Name' type="text" name="last_name" id="last_name" autoComplete='off'
                                    value={l_name} onChange={(e) => { setL_name(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='user_name'><i className="zmdi zmdi-account-circle"></i></label>
                                <input className="" placeholder='Your Username' type="text" name="user_name" id="user_name" autoComplete='off'
                                    value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='email'><i className="zmdi zmdi-email"></i></label>
                                <input className="" placeholder='Your Email' type="text" name="email" id="email" autoComplete="off"
                                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='phone_no'><i className="zmdi zmdi-phone-in-talk"></i></label>
                                <input className="" placeholder='Your Phone' type="text" name="phone_no" id="phone_no" autoComplete='off'
                                    value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='date_of_birth'><i className="zmdi zmdi-calendar"></i></label>
                                <input className="" placeholder='Your D.O.B' type="date" name="date_of_birth" id="date_of_birth" autoComplete='off'
                                    value={dob} onChange={(e) => { setDob(e.target.value) }} />
                            </div>

                            <div className='border_bottom mb-7'>
                                <label htmlFor='password'><i className="zmdi zmdi-lock"></i></label>
                                <input className="" placeholder='Your Password' type="password" name="password" id="password" autoComplete='off'
                                    value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <div className='mt-8'>
                                <button className=' btn py-2 px-4 bg-blue-500 text-white font-semibold  rounded-lg shadow-md 
                                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75' type='submit' >Register</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className='right mt-12  flex-1 ml-10 text-center pt-[20px]'>
                    <figure className='mb-5'>
                        <NavLink to='/'><img width='90%' className='rounded-lg' src="assets/images/playchess.png" alt='picture' /></NavLink>
                    </figure>
                    <NavLink to='/login' className="btn font-bold mr-8 hover:underline underline-offset-2">I am already Registered</NavLink>

                </div>
            </div>

        </div>
    )

}
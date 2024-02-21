import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import axios from 'axios'
import { useState } from 'react';
import React from 'react';
import {Link, useNavigate } from "react-router-dom";

export default function Signin(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    return (
        <div className='bg-gray-300 p-5 mx-72 rounded-lg'>
            <center>
                <div className='w-72 bg-white rounded-lg'>
                    <div className='p-10'>
                        <h2 className='text-3xl font-bold text-center'>Sign in</h2>
                        <h4 className='text-gray-600 font-semibold text-center'>Enter your credential to signin</h4>
                        <br />
                        <h4 className='font-semibold text-xl text-left pb-3'>Username :</h4>
                        <TextField id="outlined-basic" label="xyz@gmail.com" variant="outlined" value={username} 
                        onChange={(e) => setUsername(e.target.value)}/>
                        <br />
                        <h4 className='font-semibold text-xl text-left pb-3'>Password :</h4>
                        <TextField id="outlined-basic" label="Password" variant="outlined"
                        value={password}  onChange={(e) => setPassword(e.target.value)}/>
                        <br /><br />
                        <Button variant="contained" className='w-full' style={{backgroundColor:'black'}}
                            onClick={() => {
                                function callback2(data){
                                    localStorage.setItem('token',data.token) 
                                    if (data.msg === 'Signin Successfully'){
                                        navigate("/dashboard")
                                    }else {
                                        alert('Invalid email or password')
                                    }
                                }
                                function callback1(res){
                                    res.json().then(callback2)
                                }
                                fetch('http://localhost:3000/api/r1/user/signin',{
                                    method:'POST',
                                    headers : { 'Content-Type': 'application/json' },
                                    body : JSON.stringify({username,password})
                                }).then(callback1)
                        }}>Sign In</Button>
                        <h4 className='font-semibold'>Donot have an account? <Link to={'/signup'}>Signup</Link></h4>
                   </div>
                </div>
            </center>
        </div>
    )
}

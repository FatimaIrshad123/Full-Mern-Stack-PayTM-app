import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Signup(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const navigate = useNavigate();

    return (
        <div className='bg-gray-300 p-5 mx-72 rounded-lg'>
        <center>
        <div  className='w-72 bg-white rounded-lg'>
            <div className='p-10 justify-between'>
                <h2 className='text-3xl font-bold text-center '>Sign up</h2>
                <h4 className='text-gray-600 font-semibold text-center '>Enter your information to create account</h4>
                <br />
                <h4 className='font-semibold text-xl'>First Name :</h4>
                <TextField id="outlined-basic" label="Jhon" variant="outlined"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <br />
                <h4 className='font-semibold text-xl'>Last Name :</h4>
                <TextField id="outlined-basic" label="Deo" variant="outlined"
                 value={lastName} onChange={(e) => setlastName(e.target.value)} />
                <br />
                <h4 className='font-semibold text-xl'>User Name :</h4>
                <TextField id="outlined-basic" label="xyz@gmail.com" variant="outlined" 
                 value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <h4 className='font-semibold text-xl'>Password :</h4>
                <TextField id="outlined-basic" label="Password" variant="outlined" 
                 value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br /><br />
                <Button variant="contained" className='w-full' style={{backgroundColor:'black'}}
                onClick={() => {

                    function callback2(data){
                        localStorage.setItem('token',data.token) 
                        console.log(data)
                        if (data.msg === 'Admin created successfully'){
                            navigate("/dashboard")
                        }else {
                            alert(data.msg)
                        }
                    }
                    function callback1(res){
                        res.json().then(callback2)
                    }
                    fetch('http://localhost:3000/api/r1/user/signup',{
                        method:'POST',
                        headers : { 'Content-Type': 'application/json' },
                        body : JSON.stringify({username,password,firstName,lastName})
                    }).then(callback1)
                }}>Sign Up</Button>
                <h4 className='font-semibold'>Already have an account? <Link to="/signin">Login</Link></h4>
            </div>
        </div>
        </center>
        </div>
    )
}
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

export default function Dashboard(){
    const [balance,setBalance] = useState(0)  
    const [user,setUser] = useState('')  
    const [data,setData] = useState([])
    const [filter,setFilter] = useState('')

    useEffect(() => {
        function  callback1(data) {
            setUser(data.user)
            setBalance(data.balance)
        }
        function callback2(res) {
            res.json().then(callback1)
        }
        fetch('http://localhost:3000/api/r1/account',{
            headers : {'authorization':localStorage.getItem('token') }
        }).then(callback2)
    },[])
  
    useEffect(() => {
        function  callback1(response) {
            let x = (response.data.user)
        setData(x.map(e => {return(
            <div className="flex p-5 m-2 justify-between" key={e._id}>
                <h3 className="font-semibold">{e.username}</h3>
                <Button variant="contained" style={{backgroundColor:'black'}}>
                    <Link to={'/sendmoney'}>Send Money</Link></Button>
            </div>
           )}))
         }
        
        axios.get('http://localhost:3000/api/r1/user/bulk?filter='+filter,{
             headers : {'authorization':localStorage.getItem('token') }
     } ).then(callback1)
    },[filter])
    return (
        <div>
           
            <div className='flex space-x-96 border-2 border-spacing-4 p-6 m-6 rounded-lg shadow-lg justify-between'>
                <div>
                    <h2 className="font-bold text-2xl">Payment App</h2>
                </div>
                <div className=''>
                    <h4 className="font-semibold">Hello {user}</h4>
                </div>
            </div>
            <div className="font-bold text-xl m-6">
                <h2 className="pb-6">Your Balance : {balance}</h2>
                <h2>Users</h2>
            </div>
            <div className="my-2">
                <input type="text" placeholder="Search Users ..." value={filter} onChange={(e) => setFilter(e.target.value)}
                className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>{data}</div>  
        </div>
    )
}
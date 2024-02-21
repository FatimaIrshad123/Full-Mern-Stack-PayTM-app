import {Button} from '@mui/material';
import { useState } from 'react';                  

export default function SendMoney(){
    const [name,setName] = useState('')
    const [amount,setAmount] = useState(0)
    return (
        <div>
            <div className='border-2 rounded-lg shadow-lg m-20'>
                <center>
                    <h2 className='font-bold text-2xl p-6'>Send Money</h2>
                    <h2 className='font-bold text-xl pb-3'>Friend's Name</h2>
                    <input type='text' placeholder='Enter Name' className='p-2 m-6 mt-2 border-2 rounded-lg shadow-lg'
                    value={name} onChange={(e) => setName(e.target.value)}/>
                    <h2 className='text-xl'>Amount in Rs. </h2>
                    <input type='number' placeholder='Enter amount' className='p-2 m-6 mt-2 border-2 rounded-lg shadow-lg'
                    value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <br/>
                    <Button variant="contained" style={{backgroundColor:'green',marginBottom:16}} 
                    onClick={() => {
                        function callback2(data){
                            alert(data.msg)
                        }
                        function callback1(res){
                            res.json().then(callback2)
                        }
                      fetch('http://localhost:3000/api/r1/account/transfer',{
                        method : 'POST',
                        headers : {
                             'Content-Type': 'application/json',
                             'authorization':localStorage.getItem('token')},
                        body : JSON.stringify({
                            to : name,
                            amount : amount
                            })
                           }).then(callback1)
                        }}>Initiate Transaction
                    </Button>
                </center>
            </div>
        </div>
    )
}

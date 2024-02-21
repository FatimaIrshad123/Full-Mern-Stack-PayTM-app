import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    if (!localStorage.getItem('token')){
    return(
        <div>
            <div  className='flex justify-between'>
                <div>
                    <h2 className="m-5"><Link to={'/'}>PayTm</Link></h2>
                </div>
                <div className="flex space-x-4 m-5 ">
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white">Welcome</button>
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white">
                        <Link to={'/signin'}>Login</Link>
                    </button>
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white">
                        <Link to={'/signup'}>Sign up</Link>
                    </button>                   
                </div>
            </div>
        </div>
    )
}else {
    return(
        <div>
            <div className='flex justify-between border-2 rounded-lg shadow-lg m-2'>
                <div>
                    <h2 className="m-3"><Link to={'/'}>PayTm</Link></h2>
                </div>
                <div className="flex space-x-4 m-3 ">  
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white">
                        <Link to={'/dashboard'}>Dashboard</Link>
                    </button>
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white">
                        <Link to={'/sendmoney'}>Transaction</Link>
                    </button>
                    <button className="p-3 px-7 rounded-lg bg-lime-500 text-white" 
                        onClick={() => {
                            localStorage.clear()
                        }}>
                        <Link to={'/signin'}>Logout</Link>
                    </button>
                </div>
            </div>
        </div>
    )
  }
}

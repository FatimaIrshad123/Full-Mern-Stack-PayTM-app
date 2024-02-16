import Dashboard from "./components/Dashboard"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import SendMoney from "./components/SendMoney"
import Navbar from "./components/Navbar"

function App() {
 
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path={'/'} element={<h1>Welcome to payTM</h1>}/>
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        <Route path={'/signup'} element={<Signup/>}/>
        <Route path={'/signin'} element={<Signin/>}/>
        <Route path={'/sendmoney'} element={<SendMoney/>}/>
      </Routes>
    </Router>
  )
}

export default App

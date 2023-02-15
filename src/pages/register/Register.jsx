import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./register.scss";
import {toast} from 'react-hot-toast'
import axios from "axios";




const Register = () => {
  const url=process.env.REACT_APP_URL;

const navigate=useNavigate()
const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleRegister = async (e)=>{
    e.preventDefault()
    try {
      const res=await axios.post(`${url}/api/auth/register`,{username,email,password})
      toast.success("Registered Successfully")
      navigate('/login')

    } catch (error) {
      
    }

}




  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
import { useContext, useState  } from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import axios  from 'axios'
import toast from 'react-hot-toast';

const Login = () => {
  const url=process.env.REACT_APP_URL;
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const {login} =useContext(AuthContext)
const navigate=useNavigate()


 const handleLogin= async(e)=>{
  e.preventDefault()
  try {
     const res=await axios.post(`${url}/api/auth/login`,{email,password})
     navigate('/')
     login({data:res.data})
     toast.success("Login Successfully")
    
  } catch (error) {
    
    toast.error(error.response.data)
  }

 }






  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="email" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
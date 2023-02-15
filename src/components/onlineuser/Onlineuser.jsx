import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avtar from '../../assets/avtar.jpg'
import { useNavigate } from 'react-router-dom'
const Onlineuser = ({userId}) => {
    const url=process.env.REACT_APP_URL
    const [user,setUser]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        const getuser =async()=>{
            const res= await axios.get(`${url}/api/user/`+userId)
            setUser(res.data)

        }
        getuser()

    },[userId])


  return (
    <div className="user" onClick={()=>navigate(`/profile/`+user._id)} style={{cursor:"pointer"}}>
    <div className="userInfo">
      <img
        src={user?.profilePicture || Avtar}
        alt=""
      />
      <div className="online" />
      <span>{user?.username}</span>
    </div>
    </div>
  )
}

export default Onlineuser
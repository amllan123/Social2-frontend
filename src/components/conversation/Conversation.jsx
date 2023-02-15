import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../../context/authContext'
import Avtar from '../../assets/avtar.jpg'


const Conversation = ({conversation}) => {
    const navigate=useNavigate()
    const url=process.env.REACT_APP_URL
    const {currentUser}=useContext(AuthContext)
    const [lastmessage,setLastmessage]=useState([])

    const [user,setUser]=useState(null)
    useEffect(()=>{
        const friendId= conversation.members.find((m)=> m !== currentUser._id )

        const getUser = async () =>{
            try {
                const res = await axios.get(`${url}/api/user/`+friendId)
                setUser(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
      
    },[conversation._id])


    useEffect(()=>{
        
      const getMessages= async ()=>{
          try {
              const res= await axios.get(`${url}/api/message/`+conversation._id)
              setLastmessage(res.data)
          } catch (error) {
              
          }
      }
      getMessages()

  },[conversation._id])
  

  return (
    <div className="user" onClick={()=> navigate(`/chat/${conversation._id}`)}>


                    <div className='userProfile'>
                    <img src={user?.profilePicture || Avtar } alt="" className="userImg" />
                    <span className="username">{user?.username}</span>
                    </div>
                    <div className='userLastMessage'>
                      <span className="senderName">{lastmessage[lastmessage?.length-1]?.sender === currentUser._id ?`You :`:user?.username+` :`}</span>
                      <span className='userMessage'>{lastmessage[lastmessage?.length-1]?.text}</span>
                    </div>
                </div>
  )
}

export default Conversation
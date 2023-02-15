import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './chat.scss'
import axios from 'axios'
import Conversation from '../conversation/Conversation'
import {AuthContext} from '../../context/authContext'
const Chat = () => {
  const navigate = useNavigate()
  const {currentUser}=useContext(AuthContext)
  const url=process.env.REACT_APP_URL

  const [conversation,setConversation]=useState([])



  useEffect(()=>{
    const getConversations = async()=>{
      try {
        const res= await axios.get(`${url}/api/conversation/`+currentUser._id)
        setConversation(res.data)
      } catch (error) {
        
      }
    }

    getConversations()
  },[currentUser._id])
  return (
    
    <div className="chat">
        <div className="box">
        <div className="left">
            <span className="logo">Messenger</span>
            <div className="conversationList">
              {conversation.map((c)=>(
                    <Conversation conversation={c} key={c._id} />
              ))}
                 
        

                
                
            </div>
        </div>
       
        </div>

    </div>
  )
}

export default Chat
import React, { useContext, useEffect, useRef, useState } from 'react'
import './eachChat.scss'
import Avtar from '../../assets/avtar.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import {format} from 'timeago.js'
import {io} from 'socket.io-client'



const EachChat = () => {
    const url=process.env.REACT_APP_URL
    const navigate = useNavigate()
    const {id}=useParams()
    const {currentUser}=useContext(AuthContext)
    const [messages,setMessages]=useState([])
    const [user,setUser]=useState(null)
    const [newMessage,setNewMessage]= useState("")
    const scrollref= useRef()
  // get other user  data  
    useEffect(()=>{
        const getUser =async()=>{
            try {
                const res=await axios.get(`${url}/api/conversation/getUser/`+id+`/`+currentUser._id)
                setUser(res.data)
            } catch (error) {
                
            }
        }
           getUser()
    },[id])

// get all message of the conversaation 
    useEffect(()=>{
        
        const getMessages= async ()=>{
            try {
                const res= await axios.get(`${url}/api/message/`+id)
                setMessages(res.data)
            } catch (error) {
                
            }
        }
        getMessages()

    },[id])

    useEffect(()=>{
        scrollref.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

// send a message
    const handleSubmit= async (e)=>{
        e.preventDefault()
        

        try{
        const res =await axios.post(`${url}/api/message`,{
            conversationId:id,
            sender:currentUser._id,
            text:newMessage

        })
        setMessages([...messages,res.data])
        setNewMessage("")

    
    }catch(Err){
        console.log(Err);
    }


    const reciverId=user?._id
      
    //socket send msg and new object create
    socket.current.emit("send-msg",{
            to:reciverId,
            from:currentUser._id,
            msg:newMessage
        })

}


// socket work initiate
const socket= useRef()
const [arrivalMessage,setArrivalMessage]= useState(null)

useEffect(()=>{
    if(currentUser){
        socket.current=io(url)
        socket.current.emit("add-user",currentUser._id)
    
    }
    

},[currentUser])

useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
            setArrivalMessage({
                sender:msg.from,
                text: msg.msg,
                createdAt: Date.now(),
              });
        })


    }
},[])


useEffect(()=>{
arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);

},[arrivalMessage])

useEffect(()=>{
    socket.current.on("getUsers",(cur)=>{
    })
 },[currentUser])



  return (
    <>
    <div className="Chatbox">
            <div className="ChatBoxWrapper">
                <div className="chatNav">
                    <img src={user?.profilePicture || Avtar} alt="" className="userImg" />
                    <span className="username" onClick={()=> navigate("/profile/1234")}>{user?.username}</span>
                </div>
                <div className='line'></div>
                <div className="chatCenter">


                {messages.map((m)=>(
                    m.sender === currentUser._id?
                    
                    <div className="messageBox own" key={m._id} ref={scrollref}>
                    <div className="message own">
                        <img src={currentUser.profilePicture || Avtar} alt="" className="messageImg" />
                        <div>
                            <p className="messageText own">{m.text}</p>
                            <span className="messageTime">{format(m.createdAt)}</span>
                        </div>
                    </div>
                    </div>:

                    <div className="messageBox" key={m._id} ref={scrollref}>
                    <div className="message">
                        <img src={user?.profilePicture || Avtar} alt="" className="messageImg" />
                        <div>
                            <p className="messageText">{m.text}</p>
                            <span className="messageTime">{format(m.createdAt)}</span>
                        </div>
                    </div>
                    </div>
                                    
                                  

                ))}

                    
                        
                            







                </div>
                <div className="write">
                    <textarea className='writeArea' placeholder='Write Your Message' onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}/>
                    {newMessage !== "" && <button onClick={handleSubmit}>Send</button>}
                    
                </div>
                    
            </div>
    </div>
    
    
    
    </>
  )
}

export default EachChat
import "./rightBar.scss";
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {toast} from 'react-hot-toast'
import {io} from 'socket.io-client'
import Onlineuser from "../onlineuser/Onlineuser";
import Avtar from '../../assets/avtar.jpg'





const RightBar = () => {

const url=process.env.REACT_APP_URL
const [unFollowUsers,setUnfollowUsers]=useState([])
const {currentUser}=useContext(AuthContext)
const [onlineusers, setonlineusers]=useState([])




useEffect( ()=>{
  const getUnfolloweUser= async()=>{
  try {
   const res=await axios.get(`${url}/api/user/`+ currentUser._id+`/unfollowedUser`)
   setUnfollowUsers(res.data)
  } catch (error) {
    console.log(error);
  }
}
  getUnfolloweUser()
},[])


const handleFollow =async (id)=>{
   try {
    const res =  await axios.put(`${url}/api/user/`+id+`/follow`,{
      userId:currentUser._id
    })
    
    const data= currentUser
    data.following.push(id);
   localStorage.setItem('user',JSON.stringify(data))
   setUnfollowUsers(unFollowUsers.filter((e)=> e._id !== id))
   
   
  } catch (error) { 
    console.log(error);
  }
}

const handleDismis= (id)=>{
 setUnfollowUsers( unFollowUsers.filter((e)=> e._id !==id ))
 console.log(unFollowUsers);
}

// online user fetch from socket
const socket= useRef()
useEffect(()=>{
  if(currentUser){
      socket.current=io(url)
      socket.current.emit("add-user",currentUser._id)
  
  }
  

},[currentUser])


useEffect(()=>{
  socket.current.on("getUsers",(cur)=>{
   setonlineusers(cur.filter((e)=> e.userId !== currentUser._id))
  })
},[currentUser])






  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>




       {
        unFollowUsers.slice(0,Math.min(5,unFollowUsers.length)).map((c)=>(


        <div className="user" key={c._id}>
            <div className="userInfo">
              <img
                src={c.profilePicture || Avtar}
                alt=""
              />
              <span>{c.username}</span>
            </div>
            <div className="buttons">
              <button onClick={()=>handleFollow(c._id)}>follow</button>
              <button onClick={()=> handleDismis(c._id)}>dismiss</button>
            </div>
          </div>



        ))

        
       

  
        

       }

        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>



        <div className="item">
          <span>Online Friends</span>

          {
              onlineusers.map((m)=>(
                      <Onlineuser key={m.userId} userId={m.userId}/>

              ))


          }
            


        </div>
      </div>
    </div>
  );
};

export default RightBar;

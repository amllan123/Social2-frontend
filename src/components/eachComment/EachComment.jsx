import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'

const EachComment = ({comment}) => {
    const [user,setUser]=useState(null)
    const url=process.env.REACT_APP_URL

    useEffect(()=>{
        const getUser=async()=>{
            const res= await axios.get(`${url}/api/user/`+comment.userId)
            setUser(res.data)


        }        

        getUser()



    },[comment])




  return (
    <>
     <div className="comment">
          <img src={user?.profilePicture || `avtar.jpg`} alt="" />
          <div className="info">
            <span>{user?.username}</span>
            <p>{comment?.commentText}</p>
          </div>
          <span className="date">{format(comment.createdAt)}</span>
        </div>

    </>
  )
}

export default EachComment
import Post from "../post/Post";
import "./posts.scss";
import {AuthContext} from '../../context/authContext'
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


const Posts = () => {
  const url=process.env.REACT_APP_URL
  const {currentUser}=useContext(AuthContext)

  const[Posts,setPost]=useState([])
  const[isLoading,setIsLoading]=useState(false)


  
  useEffect(()=>{
    const getPost=async()=>{
      try {
        setIsLoading(true)
        const res= await axios.get(`${url}/api/post/timeline/`+currentUser._id)
        setPost(res.data)
        setIsLoading(false)
        
      } catch (error) {
        
      }

    }

    getPost()
  },[])


  return<> 
  {
    isLoading? <div className="progress">
      <CircularProgress/>
      


    </div>:<div className="posts">


    {

      Posts.map((post)=>(

          <Post post={post} key={post._id}/>

      ))

      
    }
  </div>
  
}
  </>
};

export default Posts;

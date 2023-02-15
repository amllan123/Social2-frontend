import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import EachComment from "../eachComment/EachComment";



const Comments = ({postId}) => {
  const {currentUser}=useContext(AuthContext)
  const [comments,setComments]=useState([])
  const [newComment,setNewComment]=useState("")
  const url=process.env.REACT_APP_URL

  useEffect(()=>{
    const getComments=async()=>{

      const res= await axios.get(`${url}/api/post/comment/`+postId)
      setComments(res.data)


    }
    getComments()
  },[postId])


  const handleCommentSubmit= async(e)=>{
    e.preventDefault()
    if(!newComment)
     return
    const res=await axios.post(`${url}/api/post/comment`,{
      userId:currentUser._id,
      postID:postId,
      commentText:newComment
    })
    setComments((prev)=>[...prev,res.data])
    
  }


  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="write a comment"  onChange={(e)=>setNewComment(e.target.value)}/>
        <button  onClick={handleCommentSubmit} >Send</button>
      </div>
      {comments.map((comment) => (
        <EachComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

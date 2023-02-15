import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {format} from 'timeago.js'
import {AuthContext} from '../../context/authContext'
import Avtar from '../../assets/avtar.jpg'

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const {currentUser}=useContext(AuthContext)
  const [isliked,setisLiked]=useState(false)
  const [like,setLike]=useState(post.likes.length)
  const comment=(post.comments.length)
  const url=process.env.REACT_APP_URL
  const [user,setUser]=useState(null)
  const navigate=useNavigate()


  useEffect(()=>{
      setisLiked(post.likes.includes(currentUser._id))
  },[post.likes])


const likeHandler=async()=>{
  try {
    await axios.put(`${url}/api/post/`+post._id+"/like",{userId:currentUser._id})
  } catch (error) {
    
  }

 setLike(isliked?like-1:like+1);
 setisLiked(!isliked)

}


  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await axios.get(`${url}/api/user/`+post.userId)
        setUser(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    getUser()

  },[post])


  



  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo" onClick={()=> navigate(`/profile/`+post.userId)}>
            <img src={user?.profilePicture || Avtar} alt="" />
            <div  className="details">
              
                <span className="name">{user?.username}</span>
             
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isliked ? <div onClick={likeHandler}><FavoriteOutlinedIcon /> </div> : <div onClick={likeHandler}><FavoriteBorderOutlinedIcon /></div> }
            {like} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comment} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;

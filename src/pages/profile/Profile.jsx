import {useContext, useEffect, useState} from 'react'
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {AuthContext} from '../../context/authContext'
import {DarkModeContext} from '../../context/darkModeContext'
import Avtar from '../../assets/avtar.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../../components/post/Post';
import Image from '../../assets/img.png'
import { toast } from 'react-hot-toast';
import { Tooltip } from '@mui/material';

const Profile = () => {
  const url=process.env.REACT_APP_URL


  const {currentUser}=useContext(AuthContext)
  
  const {updating} =useContext(DarkModeContext)


  const [post ,setPost]= useState([])
  const [User, setUser]= useState(null)
  const {id} =useParams()
  const [isfollow,setIsfollow]=useState(false)
  const [isUpdating , setIsUpdating] = useState(false)

  const [newuserName ,setNewUserName]=useState(currentUser.username)
  const [newemail , setEmail]= useState(currentUser.email)
  const [file1,setfile1]=useState(currentUser.profilePicture)
  const [file2 , setfile2]= useState(currentUser.coverPicture)
  const navigate=useNavigate()

  const uploadProfileImage = async ()=>{
    if(file1){
      const data=new FormData();;
      data.append('file',file1)
      data.append('upload_preset','uploads')
  
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dvthmc7cx/image/upload",
          data
        );
        const uploadedUrl=uploadRes.data.url;
        
        return uploadedUrl;
         
       
  
      } catch (error) {
        console.log(error);
        
      }
  
    }
  
  
  }
  const uploadCoverImage = async ()=>{
    if(file2){
      const data=new FormData();;
      data.append('file',file2)
      data.append('upload_preset','uploads')
  
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dvthmc7cx/image/upload",
          data
        );
        const uploadedUrl=uploadRes.data.url;
        
        return uploadedUrl;
         
       
  
      } catch (error) {
        console.log(error);
        
      }
  
    }
  
  
  }
  

  const handleUpdate = async(e)=>{
    e.preventDefault()
    let imgurl1=""
    let imgurl2=""
    if(file1) imgurl1=await uploadProfileImage();
    if(file2) imgurl2= await uploadCoverImage();

    try {
      const res= await axios.put(`${url}/api/user/`+currentUser._id,{
            userId:currentUser._id,
            username:newuserName,
            email:newemail,
            profilePicture:imgurl1,
            coverPicture:imgurl2
      })
      toast.success("Profile Updated")
      localStorage.setItem('user',JSON.stringify(res.data))
      window.location.reload(true)
      


    } catch (error) {
      
    }






  }


  
  
  useEffect(()=>{
       
       const getPosts = async()=>{
         const res = await axios.get(`${url}/api/post/allpost/`+id)
         setPost(res.data)

       }

       const getUser= async ()=>{
        const res= await axios.get(`${url}/api/user/`+id)
        setUser(res.data)

       }
       setIsfollow(currentUser.following.includes(id))
       getPosts()
       getUser()

  },[id])

  const handleFollow = async()=>{
     try {
      const res =  await axios.put(`${url}/api/user/`+id+`/follow`,{
        userId:currentUser._id
      })
      const data= currentUser
    data.following.push(id);
   localStorage.setItem('user',JSON.stringify(data))

      setIsfollow(true)
  
    } catch (error) {
      
      console.log(error);
    }
  
  }
  
  const startConversation= async()=>{

    const res= await axios.post(`${url}/api/conversation/`,{
      senderId:currentUser._id,
      reciverId:User?._id
    })
    navigate(`/chat/`+res.data._id)
    

  }



  return (
    <>
{
  
    <div className="profile">
      <div className="images">
        <img
          src={User?.coverPicture || `https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
          alt=""
          className="cover"
        />
        <img
          src={User?.profilePicture  || Avtar}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">


        <div className="uInfo">
          
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{User?.username}</span>
            <div className="info">
            
            
            </div>
            <> 
            {
            
            !isfollow?currentUser._id !== User?._id && <button onClick={handleFollow}>follow</button>: <button>Following</button>
            
            
            
            
            
            }
            
            </>
           
          </div>
          <div className="right">
            {currentUser._id !== id && 
            
            <Tooltip title= {`Start Chat With ${User?.username}`}  >

              <EmailOutlinedIcon onClick={startConversation} />
            </Tooltip>
            
            
            
            
            
            
            }

            {currentUser._id===id && <span className='update' onClick={()=>setIsUpdating(true)}>Update Profile</span> }



          </div>



        </div>
        {isUpdating && <>
          <div className="contain">
            
            <div className="box">
                <input type="text" className='UserInput' placeholder='Change Username' onChange={(e)=>setNewUserName(e.target.value)} />
                <input type="email" className='UserInput' placeholder='Change E-mail'  onChange={(e)=> setEmail(e.target.value)} />
                <div className="imageInput">
                     <input 
                         type="file" 
                            id="file" 
                         style={{display:"none"}} 
                         accept=".png , .jpeg , .jpg , .mp4 "
                        onChange={(e)=>setfile1(e.target.files[0])}
            
                         />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                        <span>Change Profile Picture </span>
                            </div>
                        </label>
                </div>
                <div className="imageInput">
                     <input 
                         type="file" 
                            id="file" 
                         style={{display:"none"}} 
                         accept=".png , .jpeg , .jpg , .mp4 "
                        onChange={(e)=>setfile2(e.target.files[0])}
            
                         />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                        <span>Change Cover Picture</span>
                            </div>
                        </label>
                </div>
                 <div className="ButtonBox">
            <button className='Update' onClick={handleUpdate} >Update</button>
            <button className='Cancel' onClick={()=>setIsUpdating(false)}>Cancel</button>
           </div>

            </div>
           
          
    </div>
        </>}



      {
          post.map((p)=>(
              <div key={p._id} style={{marginTop:"10px"}}>

             <Post post={p} />

              </div>
              
          

          

          ))



      }




      </div>

      
    </div>
    
    
}</>
  );
};

export default Profile;

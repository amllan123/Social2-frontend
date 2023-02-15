import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from 'react-hot-toast'
import axios from "axios";

import CircularProgress from '@mui/material/CircularProgress';

const Share = () => {

 const {currentUser}= useContext(AuthContext)
 const url=process.env.REACT_APP_URL
 const [file,setFile]=useState(null)
 const [postDesc,setPostDesc]=useState("")
 const [isLoading,setIsLoading]=useState(false)

const uploadImage = async ()=>{
  if(file){
    const data=new FormData();;
    data.append('file',file)
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


const handleShare=async(e)=>{
  e.preventDefault()
     if(!postDesc && !file)
     {   toast.error("Your post is Empty");
          return ;
     }
   setIsLoading(true)
  let imgUrl="";
  if (file) imgUrl=await uploadImage();


  
   try {
     await axios.post(`${url}/api/post/`,{
       userId:currentUser._id,
       desc:postDesc,
       img:imgUrl
     })
     setIsLoading(false)
     toast.success("Posted Successfully");
     setFile(null);
   } catch (error) {
      console.log(error);
   }}









  return (



    
    <div className="share">
{ isLoading?<div className="progress"><CircularProgress /> </div>:


      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePicture}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.username}?`}
          onChange={(e)=>setPostDesc(e.target.value)}
          
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input 
            type="file" 
            id="file" 
            style={{display:"none"}} 
            accept=".png , .jpeg , .jpg , .mp4 "
            onChange={(e)=>setFile(e.target.files[0])}
            
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
}
    </div>
  );
};

export default Share;

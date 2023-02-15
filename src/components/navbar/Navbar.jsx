import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Avtar from '../../assets/avtar.jpg'


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
const {currentUser}= useContext(AuthContext)
const  navigate= useNavigate()

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>ITER SOCIAL</span>
        </Link>
        <HomeOutlinedIcon onClick={()=>navigate("/")} style={{cursor:"pointer"}} />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>



      <div className="right">
       <Tooltip title="Profile"><PersonOutlinedIcon onClick={()=> navigate(`/profile/${currentUser._id}`)} style={{cursor:"pointer"}} /></Tooltip> 
        
        <Tooltip title="Chat">
   
   <EmailOutlinedIcon onClick={()=> navigate("/chat")} style={{cursor:"pointer"}} />    
    
    </Tooltip>
       
        <NotificationsOutlinedIcon />

        <Link
                to={`/profile/${currentUser._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
        <div className="user">
          <img
            src={currentUser.profilePicture || Avtar}
            alt=""
          />
          <span>{currentUser.username}</span>
        </div>
   </Link>


      </div>
    </div>
  );
};

export default Navbar;

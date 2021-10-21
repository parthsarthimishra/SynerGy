

import React, { useState } from "react";
import "./dashboard.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import cookie from 'react-cookies'
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
// import { AllProjects } from "./allprojects";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";


export function Dashboard(){
  const get_userid=cookie.load('UserId')
  const TokenId=cookie.load('TokenId')
  const [userdata,setuserdata]=useState([])
  async function AllProjectData(){
    axios.get(`http://127.0.0.1:8000/api1/Users/${get_userid}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log(response.data)
        setuserdata(response.data)

        
        
    })
    .catch(err => {
        
        console.log(err);
    })
    }
  
  useEffect(() => {
    AllProjectData()
    
  }, [])

  return(
  <Box>
  <Navbar/>
  
  <Box>Welcome {userdata.fullname}</Box>
  </Box>
  );
  }

export default Dashboard;
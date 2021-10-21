import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ProjectPage from './ProjectPage';


//Addirtejkg
//import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import React, { useState } from "react";
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
//import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
//import SideProjects from './SideProjects';
import { useState } from 'react';
import { useHistory } from 'react-router';



const drawerWidth = 240;

export default function SideProjects() {
const history=useHistory()
  const get_userid=cookie.load('UserId')
  const TokenId=cookie.load('TokenId')
  const [userdata,setuserdata]=useState([])
  async function AllProjectData(){
    axios.get(`http://127.0.0.1:8000/api1/projectsAll/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log("Console skdfhn")
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

  return (
    <Box sx={{ display: 'flex'  }} >
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          marginTop:"10rem",
          width: drawerWidth,
          flexShrink: 0,
          height:"0rem",
          marginTop:"-150px",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // backgroundColor: "#04f09e",
            zIndex: "-100" ,
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <Divider />
        <Box marginTop="10rem">
        {userdata.map(project=>( <List>
          
          <ListItem button onClick={()=>history.push(`/projects/${project.id}`)} key={project.id}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={project.name} />
          </ListItem>
        
        </List> ))}
        </Box>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      
    </Box>
  );
}






// map function

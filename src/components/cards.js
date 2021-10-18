import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//mport { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import  { useState } from "react";
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
import SideProjects from './SideProjects';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';


export  function Card_details() {
    const history = useHistory()
    const {c_id}=useParams()
    // const bull = (
    //     <Box
    //       component="span"
    //       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //     >
    //       •
    //     </Box>
    //   );
      
    //   const card = (
    //     <React.Fragment>
    //       <CardContent>
    //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //           Word of the Day
    //         </Typography>
    //         <Typography variant="h5" component="div">
    //           be{bull}nev{bull}o{bull}lent
    //         </Typography>
    //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //           adjective
    //         </Typography>
    //         <Typography variant="body2">
    //           well meaning and kindly.
    //           <br />
    //           {'"a benevolent smile"'}
    //         </Typography>
    //       </CardContent>
    //       <CardActions>
    //         <Button size="small">Learn More</Button>
    //       </CardActions>
    //     </React.Fragment>
    //   );

      const get_userid=cookie.load('UserId')
  const TokenId=cookie.load('TokenId')
  const [userdata,setuserdata]=useState([])
  const [usersname,setUsers]=useState([])
  async function AllProjectData(){
    axios.get(`http://127.0.0.1:8000/api1/card/${c_id}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log("Console skdfhn")
        console.log(response.data)
        setuserdata(response.data)
        // setUsers(response.data.user)
        
        
    })
    .catch(err => {
        
        console.log(err);
    })
    }
  
  useEffect(() => {
    AllProjectData()
    
  }, [])

  return (
      <Box alignContent="center">
      <SideProjects/>
      <Navbar/>
    <Box marginLeft="30vw" marginTop="150px"  textAlign="center" width="800px" sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
             {userdata.task}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Members : 
            </Typography>
            <Typography variant="body2">
            {usersname.map(users=>({users}))}
             users here
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"  onClick={(e)=>{
                                    e.preventDefault();
                                    
                                    history.push('/updatecard') 
                                    }}>Update</Button>
          </CardActions>
        </React.Fragment>

      </Card>
    </Box>
    </Box>
  );
}
export default Card_details;



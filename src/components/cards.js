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
import MyCards from './mycards';


export  function Card_details() {
    const history = useHistory()
    const {c_id}=useParams()
    

      const get_userid=cookie.load('UserId')
  const TokenId=cookie.load('TokenId')
  const [userdata,setuserdata]=useState([])
  const [users,setUsers]=useState([])
  const [members,setMembers]=useState([])
  //Handle Delete 
  const HandleConfirmDelete = (event) => {
    event.preventDefault()
    console.log("delete")


    axios.delete(`http://127.0.0.1:8000/api1/card/${c_id}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log(response.data)
        console.log("deleted")
        // setDeleteOpen(false)
        history.push(`/mycards/`)


    })
    .catch(err => {
        
        console.log(err);
        // setErrDelete(true)
    })

};
//get user dta
async function UserData(){
  axios.get('http://127.0.0.1:8000/api1/Users/',  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`, accept:"application/json"}})
  .then(res => {
      console.log(res.data)
      setUsers(res.data)

  })
  .catch(err => {
      
      console.log(err);
  })
}
  
  async function AllProjectData(){
    axios.get(`http://127.0.0.1:8000/api1/card/${c_id}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log("Console skdfhn")
        console.log(response.data)
        setuserdata(response.data)
        setMembers(response.data.user)
        
        
    })
    .catch(err => {
        
        console.log(err);
    })
    }
  
  useEffect(() => {
    AllProjectData();
    UserData()
    
  }, [])



  return (
      <Box alignContent="center" >
     <MyCards/>
      
    <Box marginLeft="30vw" marginTop="150px" backgroundColor="#41ebb0" textAlign="center" width="800px" sx={{ minWidth: 275, backgroundColor:"#41ebb0" }} >
      <Card variant="outlined" backgroundColor="#41ebb0" >
      <React.Fragment>
          <CardContent>
            
            <Typography variant="h5" component="div">
             {userdata.task}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Members : 
            </Typography>
            <Typography variant="body2">
            {
                        members.map(function(member,index){
                            return(
                                    users.map(function(user,index2){
                                    if(user.id===member){
                                        return(

                                                <Link style={{ textDecoration: 'none' }} to={`/members/${user.id}`}><Typography ><li>{user.fullname}</li></Typography></Link>
                                            // </div>
                                            
                                        )
                                    }
                                })
                            )
                        })}
             
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"  onClick={(e)=>{
                                    e.preventDefault();
                                    
                                    history.push(`/updatecard/${c_id}`) 
                                    }}>Update</Button>
            <Button size="small" onClick={HandleConfirmDelete} >Delete </Button>
          </CardActions>
        </React.Fragment>

      </Card>
    </Box>
    
    </Box>
    
  );
}
export default Card_details;



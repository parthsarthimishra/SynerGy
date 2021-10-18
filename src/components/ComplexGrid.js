// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import cookie from 'react-cookies';
import { Box, grid } from '@mui/system';
// import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
// import SideBar from './sidebar';
// import Title from './title';
import { Link } from 'react-router-dom';

import { ComplexGridCard } from './ComplexGridCard';
import ProjectPage from './ProjectPage';
import SideProjects from './SideProjects';
import Navbar from './Navbar';
import { UpdateProject } from './updateproject';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
// import { useHistory } from 'react-router';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export  function ComplexGrid() {
  const history = useHistory()
  const {p_id}= useParams()
  const get_userid=cookie.load('UserId')
  const TokenId=cookie.load('TokenId')
  const [userdata,setuserdata]=useState([])
  async function AllProjectData(){
    axios.get(`http://127.0.0.1:8000/api1/project/${p_id}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
    .then(response => {
        console.log("Console skdfhn")
        console.log(response.data)
        setuserdata(response.data.all_list)

        
        
    })
    .catch(err => {
        
        console.log(err);
    })
    }
  
  useEffect(() => {
    AllProjectData()
    
  }, [])
  return (
    
    <Box>
   
    <Navbar/>
    <SideProjects/>
    
      <Box  textAlign='right' marginRight="90px" marginTop="30px" >
      <Button onClick={()=>history.push(`/createlist/${p_id}`)} key={p_id} Width="5px" alignItems="center" justifyContent="center" variant="contained" >
  Create List 
</Button>
      {/* <ListItem button onClick={()=>history.push(`/createlist/${p_id}`)} key={p_id} Width="5px" alignItems="center" justifyContent="center">
      Create List
      </ListItem> */}
     </Box>
    {/* {userdata.map(list=>(<ComplexGridCard listData={list}/>))} */}
    {userdata.map(list=>(<ComplexGridCard ProjectId={p_id} listData={list}/>))}
    
    </Box>

  );
}
export default ComplexGrid;
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';
import * as React from 'react';
// import { useHistory, useParams } from 'react-router';
import cookie from 'react-cookies';
import { Box, grid } from '@mui/system';
// import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
// import SideBar from './sidebar';
// import Title from './title';
import { Link } from 'react-router-dom';
import { CardOfList } from './CardOfList';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Button, ListItem } from '@material-ui/core';
import { useHistory } from 'react-router';


export  function ComplexGridCard(props) {
  const history=useHistory()
    const list=props.listData
    const projectId=props.ProjectId
    console.log("THIS IS P_ID")
    console.log(projectId)
    const TokenId=cookie.load('TokenId')
    //delete handle
    const HandleConfirmDelete = (event) => {
      event.preventDefault()
      console.log("delete")
  
  
      axios.delete(`http://127.0.0.1:8000/api1/list/${list.id}/`,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
      .then(response => {
          console.log(response.data)
          console.log("deleted")
          // setDeleteOpen(false)
          history.push(`/projects/${projectId}`)
  
  
      })
      .catch(err => {
          
          console.log(err);
          // setErrDelete(true)
      })
  
  };
    return(
       
<Paper sx={{ p: 2, margin: 'auto', marginTop: '40px',maxWidth: 500, flexGrow: 1 , backgroundColor:"#41ebb0"}}>

      <Grid container spacing={2} >
   
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs  height="15px" textAlign="center" >
              <Typography gutterBottom variant="subtitle1" component="div"  fontSize="15px" >
                  {list.name}
                {/* {userdata.map(list=>(<Link style={{ textDecoration: 'none' }} to={`/projects/${list.id}`}><Typography ><li>{list.id}</li></Typography></Link>))} */}
              </Typography>
            
            </Grid>
          </Grid>
          <Grid item>
            
          </Grid>
        </Grid>
      </Grid>
      <Box >
     
      <ListItem button onClick={()=>history.push(`/project/${projectId}/updatelist/${list.id}/`)} key={list.id}>
      Update list
      </ListItem>
      <ListItem button onClick={HandleConfirmDelete} >
        Delete List
        </ListItem>
      <Button  onClick={()=>history.push(`/createcard/${list.id}`)} key={list.id}>
      <ControlPointIcon/>
      </Button>
        </Box>
      <Box marginTop="10px">
        {/* {userdata.map(list=>(<ComplexGridCard listData={list}/>))} */}
        {list.all_cards.map(card=>(<CardOfList cardData={card}/>))}
        </Box>
    </Paper>

    )
}
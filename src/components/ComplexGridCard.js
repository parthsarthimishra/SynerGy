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
    return(
       
<Paper sx={{ p: 2, margin: 'auto', marginTop: '40px',maxWidth: 500, flexGrow: 1 }}>

      <Grid container spacing={2}>
        {/* <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            {/* <Img alt="complex" src="/static/images/grid/complex.jpg" /> */}
          {/* </ButtonBase> */}
        {/* </Grid> */} 
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs  height="15px" textAlign="center">
              <Typography gutterBottom variant="subtitle1" component="div"  fontSize="15px" >
                  {list.name}
                {/* {userdata.map(list=>(<Link style={{ textDecoration: 'none' }} to={`/projects/${list.id}`}><Typography ><li>{list.id}</li></Typography></Link>))} */}
              </Typography>
              {/* <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography> */}
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
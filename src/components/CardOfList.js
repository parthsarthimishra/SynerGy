// @flow
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

import { Link } from 'react-router-dom';
// import { CardOfList } from './CardOfList';

import { Button } from '@material-ui/core';

// import * as React from 'react';

export function CardOfList(props) {
    const card=props.cardData
    const history = useHistory()
  return (
    <Paper >
      <Box marginTop="10px">
      <Button onClick={()=>history.push(`/card/${card.id}`)} key={card.id} fullWidth="5px" alignItems="center" justifyContent="center" variant="contained" color="success" >
      {card.task} 
</Button>
</Box>
    {/* <Typography marginTop="10px" fontSize="10px" border="10px" borderColor="green">{card.task}</Typography> */}
    
</Paper>
  );
};

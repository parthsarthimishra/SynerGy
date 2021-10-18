// @flow
import * as React from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
// import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box } from '@mui/system';
// import SideBar from './sidebar';
// import Title from './title';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory, useParams } from 'react-router';
import Dashboard from './dashboard';
import ProjectPage from './ProjectPage';


export function UpdateProject() {
    const {p_id}=useParams()
    console.log(p_id)
    const drawerWidth = 240;
    const [users, setUsers] = React.useState([])
    const [name, setName] = React.useState('')
    const [describe, setDescribe] = React.useState('')
    const [members, setMembers] = React.useState([])
    const [nameErr, setNameErr] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const history = useHistory();




    const TokenId = cookie.load("TokenId")
    const handleNameChange =(e)=>{
            
            setName(e.target.value)
        
        
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
        }
    },
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
    variant: "menu",
    getContentAnchorEl: null
    };


    async function UserData(){
        axios.get('http://127.0.0.1:8000/api1/Users/',  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
        .then(response => {
            console.log(response.data)
            setUsers(response.data)

        })
        .catch(err => {
            
            console.log("thisnisnk is error ");
        })
    }
    React.useEffect(()=>{
        UserData()
    }, [])
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(name,  members)
        setNameErr(false)
       
            const data = {
                "name":name,
                // "description" : describe,
                "members" : members
    
            }
            axios.patch(`http://127.0.0.1:8000/api1/project/${p_id}/`,data,  {headers:{"Content-Type": "application/json", "Authorization": `Token ${TokenId}`}})
        .then(response => {
            console.log("nacho bc")
            history.push(`/projects/`) 

        })
        .catch(err => {
            
            console.log(err);
        })


        
        

    }


    
    return (
        <Box>
            <ProjectPage/>
            {/* <Title title="Create a new project"/> */}
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} 
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
            {/* {nameErr?<Box sx={{fontWeight: 'bold',color: '#D72323'}}>Name cannot be empty</Box>: <Box></Box>} */}
                <Box sx={{width: '60%', mt:2}} >
                    <form onSubmit={handleFormSubmit}>
                    <Box sx={{ fontWeight: 'bold'}} mt={1} mb ={1} >
                            Project Name :
                        </Box>
                        <TextField 
                        label="Name" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={name}
                        onChange={handleNameChange}

                            
                        />
{/*                         
                        <Box sx={{ fontWeight: 'bold'}} mt={2} mb ={1} >
                            Description :
                        </Box> */}
                        {/* <CKEditor
                        // editor={ ClassicEditor }
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        data=""
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescribe(data);
                            
                        }}
                        /> */}
                        <Box sx={{ fontWeight: 'bold'}} mt={2} mb={1} >
                            Project members :
                        </Box>
                        <Box>
                           
                            <FormControl style={{minWidth: 200}}>
                                <InputLabel id="name-label">Select members</InputLabel>
                                    <Select 
                                    MenuProps={MenuProps}
                                    
                                    labelId="name-label"
                                    multiple={true}
                                    autoWidth
                                    
                                    value={members}
                                    onChange = {(e) => 
                                        setMembers(e.target.value)
                                    }
                                    >
                                    {users.map(user => {
                                        return (
                                            
                                            <MenuItem key={user.id} value={user.id}>
                                         
                                            {user.fullname}
                                            </MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                        </Box>
                        <Box mt={5}>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item >
                                <Button  
                                variant="outlined" 
                                style={{ color: '#D72323'}}  
                                // startIcon={<CancelIcon/>} 
                                disableElevation
                                onClick={(e)=>{
                                    e.preventDefault();
                                    
                                    history.push('/projects') 
                                    }}
                                >
                                    Close
                                </Button>
                                </Grid>
                                <Grid item >
                                <Button  
                                variant="contained" 
                                style={{backgroundColor: '#3F72AF', color: '#F9F7F7'}}  
                                // startIcon={<AddCircleOutlineIcon/>} 
                                disableElevation
                                type="submit" 
                                >
                                    Create project
                                </Button>
                                </Grid>
                            </Grid>
                        </Box>


                        

                    </form>
                </Box>
            </Box>
        
        </Box>
    );
    }
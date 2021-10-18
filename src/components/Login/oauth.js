import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
import cookie from 'react-cookies'
import  { Redirect } from 'react-router-dom'
import Progress from '../progress'

class OAuth extends React.Component{
    constructor(props){
        super(props)
        this.state={isLoggedIn : false}
    }
    async componentDidMount(){
        const params = new URLSearchParams(window.location.search);
        const auth = params.get("code");

        axios.get('http://127.0.0.1:8000/api1/Synergy/?code='+auth+'&state=state')
        .then(response => {
            console.log(response)
            console.log("for deBUGGING")
            cookie.save('csrftoken', response.data['csrftoken'], {path:"/"})
            cookie.save('sessionid', response.data['sessionid'], {path:"/"})
            cookie.save('TokenId',response.data['myToken'],{path:"/"})
            cookie.save('UserId',response.data['UserId'],{path:"/"})
            this.setState({isLoggedIn : true})
            
        })
        .catch(err => {
            this.setState({isLoggedIn : false})
            console.log("error occured while authenticating");
        })
        
        

    }
    render(){
        if(this.state.isLoggedIn){
            return <Redirect to='/dashboard' />
        }
        else{
            return <Progress/>
        }
        }
}

export default OAuth;
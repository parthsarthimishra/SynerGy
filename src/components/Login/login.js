import React, {Component} from 'react';
import Button from '@material-ui/core/Button';




function Login(){
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "https://channeli.in/oauth/authorise/?client_id=elJICPsYXpNkImpEJoKAQtZarxge582BWEDCaIyE&redirect_uri=http://localhost:3000/oauth";

    }
    return(
        <Button onClick={handleClick}>Sign In</Button>
    );
}
export default Login;
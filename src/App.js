



// import './App.css';
// import React, { useEffect, useState } from 'react'
// function App() {
//  const [name,setName]=useState("");
//  const [email,setEmail]=useState("");
//  const [mobile,setMobile]=useState("");
// function saveData()
// {
//   let data={name}
// // console.warn(data);
//   fetch("http://127.0.0.1:8000/api1/project/", {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body:JSON.stringify(data)
//   }).then((resp)=>{
//     // console.warn("resp",resp);;
//     resp.json().then((result)=>{
//       console.warn("result",result)
//     })
//   })
// }
//   return (
//     <div className="App">
//       <h1>POST API Example </h1>  
//       <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}  /> <br /> <br />
//       {/* <input type="text" name="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br /> <br />
//       <input type="text" name="mobile"  value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/> <br /> <br /> */}
//       <button type="button" onClick={saveData} >Save New User</button>
//     </div>
//   );
// }
// export default App;

import './App.css';
import {React} from 'react';
import Login from './components/Login/login';
import OAuth from './components/Login/oauth';
import Dashboard from './components/dashboard';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/oauth' component={OAuth}/>
        {/* <Route exact path='/dashboard' component={Dashboard}/> */}
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import {React} from 'react';
import Login from './components/Login/login';
import OAuth from './components/Login/oauth';
import Dashboard from './components/dashboard';
import ProjectPage from './components/ProjectPage';
import ComplexGrid  from './components/ComplexGrid';
// import MiniDrawer from './components/MiniDrawer';
import axios from 'axios';
// import Sidebar from "./components/Sidebar"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MiniDrawers from './components/MiniDrawer';
import { CreateProject } from './components/CreateProject';
import MyProjects from './components/myprojects';
import MyCards from './components/mycards';
import { UpdateProject } from './components/updateproject';
import { CreateList } from './components/createlist';
import { CreateCard } from './components/createcard';
import Card, { Card_details } from './components/cards';
import { UpdateCard } from './components/updatecard';
import { UpdateList } from './components/updatelist';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/oauth' component={OAuth}/>
        <Route exact path='/dashboard' component={Dashboard}/> 
        <Route exact path='/ProjectPage' component={ProjectPage}/> 
        {/* <Route exact path='/MiniDrawer' component={MiniDrawer}/>  */}
        {/* <Route exact path='/sidebar' component={Sidebar}/> */}
        <Route exact path='/projects/:p_id' component={ComplexGrid}/>
        <Route exact path='/updateprojects/:p_id' component={UpdateProject}/>
        <Route exact path='/updatecard/:c_id' component={UpdateCard}/>
        <Route exact path='/project/:p_id/updatelist/:l_id/' component={UpdateList}/>
        <Route exact path='/createlist/:p_id' component={CreateList}/>
        <Route exact path='/createcard/:l_id' component={CreateCard}/>
        <Route exact path='/card/:c_id' component={Card_details}/>
        <Route exact path='/createproject' component={CreateProject}/>
        <Route exact path='/myprojects' component={MyProjects}/>
        <Route exact path='/mycards' component={MyCards}/>
      </Switch>
    </Router>
  );
}

export default App;



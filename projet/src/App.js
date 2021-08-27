import Topbar from './components/Topbar'
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import Home  from './components/Home';
import AjoutMalade  from './components/AjoutMalade';
import Modifier  from './components/Modifier';
import Login  from './components/Login';
import './App.css';
import React , { useState, useEffect } from 'react';
import api from "./api/malades";


function App() {

  let [malades, setMalades] = useState([""]);
    const retrieveMalades = async () => {
        const response = await api.get("/malades");
        return response.data;
    };
    useEffect(() =>{
        const getAllMalades = async () => {
            setMalades(await retrieveMalades());  
        }; 
        getAllMalades();
    }, [])

  return (
    <div className="App">
      <ToastContainer/>  
      <Topbar/>  
      <Switch>
          <Route exact path="/" component={()=><Login/>}/>
          <Route exact path="/home" component={()=><Home/>}/>
          <Route path="/ajout">
            <AjoutMalade/>
            <br></br>
          </Route>
          <Route path="/modifier/:id">
            <Modifier malades={malades}/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;

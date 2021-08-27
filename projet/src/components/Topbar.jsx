import React from 'react';
import {Link} from "react-router-dom";
import logo from '../images/logo.png';

export default function Topbar() {
    return (
       <nav className="navbar navbar-expend-lg navbar-dark bg-danger py-1 d-flex justify-content-around">
           <Link to="/" className="navbar-brand ml-5" style={{color:"white", fontSize:"30px" , fontWeight:"bold"}}>
           <img style={{width:'17%'}} src={logo} alt="Logo" />
            Le gestionnaire des malades
           </Link>
       </nav>
    );
}

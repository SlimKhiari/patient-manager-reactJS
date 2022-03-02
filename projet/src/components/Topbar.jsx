import React from 'react';
import {Link} from "react-router-dom";
import logo from '../images/logo.png';
import { useAuth0 } from "@auth0/auth0-react";


export default function Topbar() {
    const { logout, isAuthenticated } = useAuth0();
    return (
    
       isAuthenticated && (
        <nav className="navbar navbar-expend-lg navbar-dark bg-danger py-1 d-flex justify-content-around">
        <Link to="/" className="navbar-brand ml-5" style={{color:"white", fontSize:"30px" , fontWeight:"bold"}}>
        <img style={{width:'17%'}} src={logo} alt="Logo" />
         Le gestionnaire des malades
        </Link>
        <button onClick={() => logout()}>
              Se déconnecter
            </button>
    </nav>
            
    ));
}

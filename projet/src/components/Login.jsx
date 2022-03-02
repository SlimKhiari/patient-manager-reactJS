import React, {useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <div>
            { !isAuthenticated && (<button onClick={() => loginWithRedirect()}> Se connecter </button>)}
        </div>
     
    )
  }
  
  export default Login


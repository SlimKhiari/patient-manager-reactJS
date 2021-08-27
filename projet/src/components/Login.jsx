import React, {useState} from 'react'
import  { useHistory } from 'react-router-dom';

export default function Login() {
    
    const [login,setLogin] = useState("");
    const [password,setPassword] = useState("");

    const history = useHistory(); 
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
           login,
           password
        }

        if(data.login === "medecin" && data.password === "passe")
        {
            history.push("/home");
        }
        else if(data.password !== "passe")
        {
            alert("Le mot de passe est erroné.");
        }
        else if(data.login !== "medecin")
        {
            alert("L'identifiant est erroné.");
        }
    }

    return (
        <div>
            <br/> <br/> <br/> <br/> <br/>
            <form onSubmit={handleSubmit} >
                <div>
                    <h3>Bonjour, veuillez vous connecter.</h3>
                </div>
                <br/>
                <div>
                    <input type="text" placeholder="Identifiant" value={login} onChange={(e)=>setLogin(e.target.value)}>
                    </input>
                </div>
                <br/>
                <div>
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                </div> 
                <br/>
                <button style={{ backgroundColor: "#4CAF50",border: "none",color: "white"}}>Se connecter</button>
            </form>
        </div>
    )
}

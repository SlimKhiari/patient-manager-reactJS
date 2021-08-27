import React , {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { effacerMalade } from "../redux/actions/maladeAction";
import api from "../api/malades";
import { Form } from "react-bootstrap";


export default function Home() {
    
    const [searchTerm, setSearchTerm] = useState("");
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

    const dispatch = useDispatch();

    const deletMalade = (id, prenom, nom) =>{
        dispatch(effacerMalade(id));
        alert(`Le (la) malade ${ prenom } ${ nom } a bien été supprimé(e) de la liste des malades.`);
        window.location.reload(false);
    }

    return (
       <div className="container">
           <div className="row">
                <div className="col-md 12 my-5 text-right">
                    <Form.Control type="text"
                        placeholder="Chercher un(e) malade en tapant ici uniquement son nom" onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} className="btn-light"
                        /><br/> <hr></hr>
                         <br/><Link to="ajout" className="btn btn-outline-dark"> Ajouter un (une) malade</Link><br/>
                </div>
                <hr></hr>
                <div className="col-md-15 mx-auto">
                    <h4>Les informations des malades enregistrés:</h4>
                    <br/>
                    <table className="table table:hover">
                        <thead className="text-white bg-dark text-center">
                            <tr>
                                <th scope="col">Numéro</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Téléphone</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                malades.filter((val) => {
                                    if(searchTerm == "") {
                                        return val
                                    } else if (val.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map((malade,id)=>{
                                    return (
                                        <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{malade.prenom}</td>
                                        <td>{malade.nom}</td>
                                        <td>{malade.telephone}</td>
                                        <td>
                                            <Link to={`/modifier/${malade.id}`} className="btn btn-small">
                                                Plus de détails
                                            </Link>
                                            <br/>   <br/>
                                            <button type="button" onClick={() => deletMalade(malade.id, malade.prenom, malade.nom)} className="btn btn-small btn-danger">
                                                Effacer
                                            </button>
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
           </div>
       </div>
    );
}
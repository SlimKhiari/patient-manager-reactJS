import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import  { useHistory } from 'react-router-dom';
import { ajouterMalade } from "../redux/actions/maladeAction";
import api from "../api/malades";

const AjoutMalade = () => {

    const [prenom,setPrenom] = useState("");
    const [nom,setNom] = useState("");
    const [adresse,setAdresse] = useState("");
    const [telephone,setTelephone] = useState("");
    const [date,setDate] = useState("");
    const [antecedant,setAntecedant] = useState("");
    const [examen,setExamen] = useState("");
    const [exploration,setExploration] = useState("");
    const [ordonnance,setOrdonnance] = useState("");

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
    
    const history = useHistory(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if( !prenom || !nom || !date)
        {
            return toast.error("Il faut saisir le nom , le prénom et la date de naissance du (de la) malade!")
        }

        const data = {
            id: malades.length > 0 ? malades[malades.length - 1].id + 1 : 0,
            prenom,
            nom,
            adresse,
            date,
            examen,
            telephone,
            antecedant,
            exploration,
            ordonnance
        }

        let existe=false;
        if(malades.length > 0) {
            for(var i=0; i<malades.length; i++) {
                if(malades[i].nom === data.nom && malades[i].prenom === data.prenom && malades[i].date === data.date) {  
                    existe=true;               
                }
            }
            if(existe) {   toast.warning(`${data.prenom} ${data.nom} existe déjà!`); }
            else {   dispatch(ajouterMalade(data));
                toast.success(`${data.prenom} ${data.nom} a bien été enregistré(e).`); }
        }
        else{
            dispatch(ajouterMalade(data));
            toast.success(`${data.prenom} ${data.nom} a bien été enregistré(e).`);
        }
    }

    function lireMalades()
    {
        history.push("/home");
        window.location.reload(false);
    }

    return (
        <div className="container">
           <div className="row">
                <h1 className="display-9 my-5 text-center"> Dossier médical</h1>
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Prénom du (de la) malade" className="form-control" value={prenom} onChange={(e)=>setPrenom(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Nom du (de la) malade" className="form-control" value={nom} onChange={(e)=>setNom(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Adresse du (de la) malade" className="form-control" value={adresse} onChange={(e)=>setAdresse(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Téléphone du (de la) malade" className="form-control" value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Date de naissance du (de la) malade. (jour/mois/année)" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                        <div>
                        <h1 className="display-9 text-center"> Examen du (de la) malade</h1>
                            <div className="form-group">
                                <textarea style={{height:"200px"}} type="text" placeholder="Antécédants médiacaux" className="form-control" value={antecedant} onChange={(e)=>setAntecedant(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <textarea style={{height:"200px"}} type="text" placeholder="Examen physique" className="form-control" value={examen} onChange={(e)=>setExamen(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <textarea style={{height:"200px"}} type="text" placeholder="Exploration" className="form-control" value={exploration} onChange={(e)=>setExploration(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <textarea style={{height:"200px"}} type="text" placeholder="Ordonnance médicale" className="form-control" value={ordonnance} onChange={(e)=>setOrdonnance(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <br/>
                            <input type="submit" value="Ajouter le (la) malade" className="btn btn-block btn-success"/>
                            <br/><br/>
                            <h1 className="btn btn-dark" onClick={lireMalades}>Consulter la liste des malades</h1>
                        </div>
                    </form>
                </div>
           </div>
           <br/>
       </div>
    )
}

export default AjoutMalade

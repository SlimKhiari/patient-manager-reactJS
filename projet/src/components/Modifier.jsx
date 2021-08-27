import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import  { useHistory } from 'react-router-dom';
import { mettreAjourMalade } from "../redux/actions/maladeAction";
import api from "../api/malades";

const Modifier = () => {
    
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

    const {id} = useParams();

    const currentMalade = malades.find(malade=>malade.id === parseInt(id));

    const dispatch = useDispatch();
    
    const history = useHistory(); 

    useEffect(() => {
    if(currentMalade){
        setPrenom(currentMalade.prenom);
        setNom(currentMalade.nom);
        setAdresse(currentMalade.adresse);
        setTelephone(currentMalade.telephone);
        setDate(currentMalade.date);
        setAntecedant(currentMalade.antecedant);
        setExamen(currentMalade.examen);
        setExploration(currentMalade.exploration);
        setOrdonnance(currentMalade.ordonnance);
    }}
    ,[currentMalade])

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if( !prenom || !nom)
        {
            return toast.error("Il faut saisir le nom et le prénom du (de la) malade!")
        }

        const data = {
            id: parseInt(id),
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

        dispatch(mettreAjourMalade(data));
        toast.success(`La modification des informations de ${data.prenom} ${data.nom} a bien été enregistrée.`);
    }

    
    function lireMalades()
    {
        history.push("/home");
        window.location.reload(false);
    }

    return (
        <div className="container">
            {
                currentMalade? (
                    <>
                <h1 className="display-9 my-5 text-center"> Modifier les informations du (de la) malade {prenom} {nom} </h1>
                <div className="row">
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
                                <textarea  style={{height:"200px"}} type="text" placeholder="Antécédants médiacaux" className="form-control" value={antecedant} onChange={(e)=>setAntecedant(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <textarea  style={{height:"200px"}} type="text" placeholder="Examen physique" className="form-control" value={examen} onChange={(e)=>setExamen(e.target.value)}/>
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
                            <input type="submit" value="Confirmer la mise à jour" className="btn btn-block btn-success"/><br/>
                            <br/>
                            <h1 className="btn btn-danger"  onClick={lireMalades}>Consulter la liste des malades</h1>
                        </div>
                    </form>
                </div>
           </div>
           </>
                ):(
                    <h1 className="display- my-5 text-center"> Pas de malade trouvé(e).</h1>
                )}
            <br/>
       </div>
    );
};

export default Modifier

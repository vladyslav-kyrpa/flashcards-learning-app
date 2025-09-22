import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";
import LoadingScreen from "../LoadingScreen";
import api from "../../services/DeckApi.js";

export default function EditDeckPage() {
    const [deck, setDeck] = useState();
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        setDeck(undefined);
        api.get(id).then((result)=>{
            setDeck(result);
        }).catch((error)=>{
            console.log(error);
        }); 
    },[id]);

    const handleOnSave = (title, cards) => {
        api.update(id, {title, cards}).then((_)=>{
            navigate(`/deck/${id}`);
        }).catch((error)=>{
            console.error(error);
        });
    }

    if(!deck) return <LoadingScreen/>
    return <DeckEditor cards={deck.cards} title={deck.title} onSave={handleOnSave}/>
}
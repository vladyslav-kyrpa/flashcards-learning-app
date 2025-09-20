import { useEffect, useState } from "react";
import DeckList from "./shared/DeckList";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import api from "../api/DeckApp.js";

export default function DeckListPage(){
    const [decks, setDecks] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        api.getList().then((result)=>{
            console.log(result);
            setDecks(result);
        }).catch((error)=>{
            console.error(error);
        });
    },[]);


    const handleOnCreate = () => {
        navigate("/create-deck");
    }

    if(!decks) return <LoadingScreen/>
    return <div>
        <div className="bg-active p-3 m-2 text-center" 
            onClick={handleOnCreate}>+ Create new deck</div>
        <DeckList decks={decks} className="m-2"></DeckList>
    </div>
}
import { useEffect, useState } from "react";
import DeckList from "./shared/DeckList";
import LoadingScreen from "./LoadingScreen";
import api from "../services/DeckApi.js";

export default function DeckListPage(){
    const [decks, setDecks] = useState();

    useEffect(()=>{
        api.getList().then((result)=>{
            console.log(result);
            setDecks(result);
        }).catch((error)=>{
            console.error(error);
        });
    },[]);

    if(!decks) return <LoadingScreen/>
    return <div>
        <DeckList decks={decks} className="m-2"></DeckList>
    </div>
}
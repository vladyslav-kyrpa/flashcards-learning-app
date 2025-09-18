import { useEffect, useState } from "react";
import { DeckList } from "./shared/DeckList";
import { LoadingScreen } from "./LoadingScreen";

export function DeckListPage(){
    const [decks, setDecks] = useState();

    useEffect(()=>{
        getDecks().then((result)=>{
            console.log(result);
            setDecks(result);
        }).catch((error)=>{
            console.error(error);
        });
    },[]);

    if(!decks) return <LoadingScreen/>
    return <div>
        <div className="bg-active p-3 m-2 text-center">+ Create new deck</div>
        <DeckList decks={decks} className="m-2"></DeckList>
    </div>
}

function getDecks(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([
                { id:"1", title: "deck1" },
                { id:"2", title: "deck2" },
                { id:"3", title: "deck3" }
            ]);
        }, 1000);
    });
}
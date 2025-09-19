import { useNavigate } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";

export default function CreateDeckPage(){
    const navigate = useNavigate();

    const handleOnCreate = (title, cards) => {
        createDeck(cards, title).then((_)=>{
            navigate("/decks");
        }).catch((error)=>{
            console.error(error);
        });
    } 

    return <DeckEditor onSave={handleOnCreate}/>
}

async function createDeck(cards, title) {
    console.log(title);
    console.log(cards);

    return new Promise((resolve)=>{
        setTimeout(()=>{resolve()}, 1000)
    });
}
import { useNavigate } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";
import api from "../../api/DeckApp.js";

export default function CreateDeckPage(){
    const navigate = useNavigate();

    const handleOnCreate = (title, cards) => {
        api.create({cards, title}).then((_)=>{
            navigate("/decks");
        }).catch((error)=>{
            console.error(error);
        });
    } 

    return <DeckEditor onSave={handleOnCreate}/>
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";
import LoadingScreen from "../LoadingScreen";

export default function EditDeckPage() {
    const [deck, setDeck] = useState();
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        setDeck(undefined);
        getDeck(id).then((result)=>{
            setDeck(result);
        }).catch((error)=>{
            console.log(error);
        }); 
    },[id]);

    const handleOnSave = (title, cards) => {
        updateDeck(id, title, cards).then((_)=>{
            navigate(`/deck/${id}`);
        }).catch((error)=>{
            console.error(error);
        });
    }

    if(!deck) return <LoadingScreen/>
    return <DeckEditor cards={deck.cards} title={deck.title} onSave={handleOnSave}/>
}

async function updateDeck(id, title, cards) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000); // 1 second delay
  });
}

async function getDeck(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1234",
        title: "Cards set",
        cards: [
          { front: "frontSide1 here", back: "backSide here1" },
          { front: "frontSide2 here", back: "backSide here2" },
          { front: "frontSide3 here", back: "backSide here3" },
        ],
      });
    }, 1000); // 1 second delay
  });
}
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { useSwipeable } from "react-swipeable";
import api from "../../services/DeckApi.js";
import { ActiveButton } from "../shared/Buttons.jsx";
import Card from "../shared/Card.jsx";

export default function DeckPage(){
    const { id } = useParams();
    const [deck, setDeck] = useState();
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);

    useEffect(()=>{
        setDeck(null); // reset value
        api.get(id)
            .then((result)=>{
                setDeck(result)
                console.log(result);
            })
            .catch((error)=>console.error(error))
    },[id]);

    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    }

    const nextCard = () => {
        if(deck.cards.length-1 == cardIndex)
            return;
        setIsFlipped(false);
        setCardIndex(cardIndex+1);
    }

    const prevCard = () => {
        if(cardIndex == 0)
            return;
        setIsFlipped(false);
        setCardIndex(cardIndex-1);
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => toggleCard(), 
        onSwipedRight: () => toggleCard(), 
        trackMouse: true,
    });

    if(!deck) return <LoadingScreen/>

    if(deck.cards.length == 0)
        return <div>No cards... something is wrong</div>

    return <div className="flex flex-col items-center justify-center">
        <Card swipeHandlers={swipeHandlers} isFlipped={isFlipped} 
            onClick={toggleCard} card={deck.cards[cardIndex]}/>
        <div className="flex gap-2">
            <ActiveButton className="flex-1 w-10" onClick={prevCard}>{`<`}</ActiveButton>
            <ActiveButton className="flex-1 w-10" onClick={nextCard}>{`>`}</ActiveButton>
        </div>
    </div>
}

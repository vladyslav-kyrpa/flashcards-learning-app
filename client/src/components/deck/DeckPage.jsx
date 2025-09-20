import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { useSwipeable } from "react-swipeable";
import api from "../../api/DeckApp.js";

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

    return <div className="flex flex-col h-screen items-center justify-center">
        <Card swipeHandlers={swipeHandlers} isFlipped={isFlipped} 
            onClick={toggleCard} card={deck.cards[cardIndex]}/>
        <div>
            <button className="bg-active m-2 p-3" onClick={prevCard}>prev</button>
            <button className="bg-active m-2 p-3" onClick={nextCard}>next</button>
        </div>
    </div>
}

function Card({isFlipped, card, onClick, swipeHandlers}){
    const baseStyle = "absolute card-face p-10 bg-active w-full h-full"
    return <div {...swipeHandlers} className="relative w-64 h-80" onClick={onClick}>
        <div className={`${baseStyle} ${isFlipped && "front-turned"}`}>
            {card.front}
        </div>
        <div className={`${baseStyle} ${!isFlipped && "back-turned"}`}>
            {card.back}
        </div>
    </div>
}
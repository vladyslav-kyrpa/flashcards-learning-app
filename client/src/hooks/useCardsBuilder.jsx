import { useState } from "react";

export default function useCardsBuilder(initialCards) {
    const [cards, setCards] = useState(initialCards ?? []);

    const newCard = () =>{
        setCards([{front:"", back:""}, ...cards]);
    }

    const editCard = (index, card) =>{
        const newCards = [...cards];
        newCards[index] = card;
        setCards(newCards);
    }

    const deleteCard = (index) =>{
        const newCards = [...cards];
        newCards.splice(index,1);
        setCards(newCards);
    }

    return [cards, newCard, editCard, deleteCard];
}
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { useSwipeable } from "react-swipeable";
import api from "../../services/DeckApi.js";
import { ActiveButton } from "../shared/Buttons.jsx";
import Card from "../shared/Card.jsx";
import { ErrorNotification } from "../shared/Dialogs.jsx";
import useApi from "../../hooks/useApi.js";
import ErrorScreen from "../ErrorScreen.jsx";

export default function DeckPage() {
    const { id } = useParams();
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);
    const { isLoading, data: deck, error } = useApi(() => api.get(id), id);
    const navigate = useNavigate();

    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    }

    const nextCard = () => {
        if (deck.cards.length - 1 == cardIndex)
            return;
        setIsFlipped(false);
        setCardIndex(cardIndex + 1);
    }

    const prevCard = () => {
        if (cardIndex == 0)
            return;
        setIsFlipped(false);
        setCardIndex(cardIndex - 1);
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => toggleCard(),
        onSwipedRight: () => toggleCard(),
        trackMouse: true,
    });

    if (isLoading) return <LoadingScreen />

    if (error) return <ErrorScreen error={error} />

    if (deck.cards.length == 0)
        return <div>No cards... something is wrong</div>

    const toAuthor = () => {
        navigate(`/profile/${deck.author.id}`);
    }

    return <div className="flex flex-col items-center justify-center">
        <div onClick={toAuthor}>author: {deck.author.name}</div>
        <Card swipeHandlers={swipeHandlers} isFlipped={isFlipped}
            onClick={toggleCard} card={deck.cards[cardIndex]} />
        <div className="flex gap-2">
            <ActiveButton className="flex-1 w-10" onClick={prevCard}>{`<`}</ActiveButton>
            <ActiveButton className="flex-1 w-10" onClick={nextCard}>{`>`}</ActiveButton>
        </div>
        {error && <ErrorNotification onClose={() => setError("")} message={error} />}
    </div>
}

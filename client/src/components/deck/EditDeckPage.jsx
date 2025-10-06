import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";
import LoadingScreen from "../LoadingScreen";
import api from "../../services/DeckApi.js";
import { ActiveButton } from "../shared/Buttons.jsx";
import { Confirmation } from "../shared/Dialogs.jsx";

export default function EditDeckPage() {
    const [deck, setDeck] = useState();
    const [error, setError] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        setDeck(undefined);
        api.get(id).then((result) => {
            setDeck(result);
        }).catch((error) => {
            console.log(error);
            setError(error.message);
        });
    }, [id]);

    const handleOnSave = (title, cards) => {
        api.update(id, { title, cards }).then((_) => {
            navigate(`/deck/${id}`);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleOnDelete = () => {
        api.remove(id).then((_) => {
            navigate(`/decks`);
        }).catch((error) => {
            console.error(error);
        })
    }

    if (!deck) return <LoadingScreen />
    return <div className="flex flex-col">
        <DeleteButton onClick={handleOnDelete} />
        <DeckEditor cards={deck.cards} title={deck.title} onSave={handleOnSave} />
        {error && <ErrorNotification onClose={() => setError("")} message={error} />}
    </div>
}

function DeleteButton({ onClick }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return <>
        <ActiveButton className="m-2" onClick={() => setShowConfirmation(true)}>Delete Deck</ActiveButton>
        {
            showConfirmation && <Confirmation
                onCancel={() => setShowConfirmation(false)}
                onConfirm={onClick}
                message="Do you really want to delete this deck?" />
        }
    </>
}
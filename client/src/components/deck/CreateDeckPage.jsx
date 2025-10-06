import { useNavigate } from "react-router-dom";
import DeckEditor from "../shared/DeckEditor";
import api from "../../services/DeckApi.js";
import { useState } from "react";

export default function CreateDeckPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleOnCreate = (title, cards) => {
        api.create({ cards, title }).then((_) => {
            navigate("/decks");
        }).catch((error) => {
            console.error(error);
            setError(error.message);
        });
    }

    return <>
        <DeckEditor onSave={handleOnCreate} />
        {error && <ErrorNotification onClose={() => setError("")} message={error} />}
    </>
}
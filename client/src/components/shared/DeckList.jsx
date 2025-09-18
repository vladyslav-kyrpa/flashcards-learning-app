import { useNavigate } from "react-router-dom";

export function DeckList({decks, className}) {
    const navigate = useNavigate();

    const handleDeckSelection = (id) => {
        navigate(`/deck/${id}`);
    }

    const handleOnEdit = (id) => {
        navigate(`/edit-deck/${id}`);
    }

    
    const items = decks.map((deck, key) =>
        <DeckListItem key={key} deck={deck} 
            onClick={handleDeckSelection}
            onEdit={handleOnEdit}
        />);

    return <div className={`grid grid-cols-2 gap-4 ${className}`}>{items}</div> 
}

function DeckListItem({deck, onClick, onEdit}) {
    return <div className="relative flex p-2 bg-surface h-80">
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 p-3 bg-surface flex-1 me-2" 
            onClick={()=>{onClick(deck.id)}}>
            <p>{deck.title}</p>
        </div>
        <div className="absolute right-3 top-3 p-3 bg-active" 
            onClick={()=>{onEdit(deck.id)}}>Edit</div>
    </div>
}
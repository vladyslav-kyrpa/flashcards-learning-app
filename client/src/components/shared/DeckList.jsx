import { useNavigate } from "react-router-dom";
import DeckImage from "../../assets/images/deck-frame.png";
import EditDeckIcon from "../../assets/images/edit-deck-icon.png";
import { IconButton } from "./Buttons";

export default function DeckList({decks, className}) {
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
    return <div className="aspect-[3/4] shadow relative flex p-2 bg-on-surface w-full pop-on-hover">
        <div className="absolute right-0 top-0 bottom-0 left-0 p-2"> 
            <img src={DeckImage} alt="" />
        </div>
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 p-3 flex-1 me-2" 
            onClick={()=>{onClick(deck.id)}}>
            <p>{deck.title}</p>
        </div>
        <IconButton className="absolute right-7 top-7" icon={EditDeckIcon} onClick={()=>(onEdit(deck.id))}/>
    </div>
}
import useCardsBuilder from "../../hooks/useCardsBuilder";
import { useState } from "react"

export default function DeckEditor({initTitle = "", initCards = [], onSave}){
    const [cards, newCard, editCard, deleteCard] = useCardsBuilder(initCards)
    const [title, setTitle] = useState(initTitle);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleOnSave = () => {
        // TODO: add input checks
        onSave(title, cards);
    }

    const handleOnAddCard = () => {
        newCard();
    }

    const handleOnDeleteCard = (index) => {
        if(selectedIndex === cards.lenght-1 && index)
            setSelectedIndex(-1);
        deleteCard(index);
    }

    const handleOnEdit = (index) =>{
        console.log("Edit card")
        if(selectedIndex != -1)
            handleOnSaveCard(); 
        setSelectedIndex(index);
    }

    const handleOnSaveCard = (card) => {
        editCard(selectedIndex, card); 
        setSelectedIndex(-1); 
    }

    return <div className="p-2">
        <input className="bg-surface" value={title} 
            onChange={(e)=>setTitle(e.target.value)}/>
        <button className="bg-active p-2 my-2" 
            onClick={handleOnAddCard}>+ Add Card</button>
        <button className="bg-active p-2 my-2" 
            onClick={handleOnSave}>Save Deck</button>
        <div>{
            cards.map((card, index)=>{
                return index === selectedIndex 
                    ? <CardEditingListItem key={index} card={card} 
                        onSave={handleOnSaveCard} 
                        onCancel={()=>setSelectedIndex(-1)}/> 
                    : <CardListItem key={index} card={card}
                        onEdit={()=>handleOnEdit(index)}
                        onDelete={()=>handleOnDeleteCard(index)}/>;
            })
        }</div>
    </div>
}

function CardEditingListItem({card, onSave, onCancel}){
    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);
    
    const handleOnSave = () => {
        onSave({front, back});
    }

    return <div>
        <input value={front} className="bg-on-surface mb-2"
            onChange={(e)=>setFront(e.target.value)}/>
        <input value={back} className="bg-on-surface" 
            onChange={(e)=>setBack(e.target.value)}/>
        <button className="bg-active p-2" onClick={handleOnSave}>Save</button>
        <button className="bg-active p-2" onClick={onCancel}>Cancel</button>
    </div>
}

function CardListItem({card, onEdit, onDelete}) {
    return <div className="p-3 bg-surface">
        <p>{`Front:${card.front}, Back:${card.back}`}</p>
        <button className="bg-active p-2" onClick={onEdit}>Edit</button>
        <button className="bg-active p-2" onClick={onDelete}>Delete</button>
    </div>
}
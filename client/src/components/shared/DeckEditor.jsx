import useCardsBuilder from "../../hooks/useCardsBuilder";
import { useState } from "react"
import { ActiveButton, IconButton } from "./Buttons";
import EditIcon from "../../assets/images/edit-icon.png";
import DeleteIcon from "../../assets/images/delete-icon.png";
import { TextArea, TextBox } from "./TextBoxes";

export default function DeckEditor({title:  initTitle = "", cards:initCards = [], onSave}){
    const [cards, newCard, editCard, deleteCard] = useCardsBuilder(initCards)
    const [title, setTitle] = useState(initTitle);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isImporting, setIsImporting] = useState(false);
    const [importedText, setImportedText] = useState("");

    const handleOnSave = () => {
        // TODO: add input checks
        onSave(title, cards);
    }

    const handleOnAddCard = () => {
        newCard();
        if(selectedIndex != -1)
            setSelectedIndex(selectedIndex+1);
    }

    const handleOnDeleteCard = (index) => {
        if(selectedIndex > index)
            setSelectedIndex(selectedIndex-1)
        deleteCard(index);
    }

    const toggleImport = () => {
        setIsImporting(!isImporting);
    }

    const handleOnImport = (value) => {
        // TODO: add value parsing 
        console.log(value);
    }

    const handleOnEdit = (index) =>{
        setSelectedIndex(index);
    }

    const handleOnSaveCard = (card) => {
        editCard(selectedIndex, card); 
        setSelectedIndex(-1); 
    }

    return <div className="p-2">
        <div className="flex mb-3 p-3 bg-surface gap-2 rounded">
            <TextBox className="flex-1" value={title} onChange={setTitle}/>
            <ActiveButton onClick={handleOnSave}>Save Deck</ActiveButton>
        </div>

        <ActiveButton className="w-full mb-2" onClick={toggleImport}>Import</ActiveButton>
        { isImporting && <CardsImport className="mb-3" onImport={handleOnImport}/> }

        <ActiveButton className="w-full mb-2" onClick={handleOnAddCard}>+ Add Card</ActiveButton>
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

function CardsImport({onImport, className}){
    const [value, setValue] = useState("");

    return <div className={`${className} p-3 bg-surface`}>
        <p className="mb-2">To import, you should paste values in correct form: front -- back </p>
        <TextArea className="mb-2"  value={value} onChange={setValue} rows={5}/>
        <ActiveButton onClick={()=>onImport(value)}>Parse values</ActiveButton>
    </div>
}

function CardEditingListItem({card, onSave, onCancel}){
    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);
    
    const handleOnSave = () => {
        onSave({front, back});
    }

    return <div className="bg-surface p-5 mb-2">
        <div className="flex gap-2 mb-2">
            <TextBox value={front} onChange={setFront} className="flex-1"/>
            <p>{`=>`}</p>
            <TextBox value={back} onChange={setBack} className="flex-1"/>
        </div>
        <div className="flex gap-2">
            <ActiveButton className="flex-1" onClick={handleOnSave}>Save</ActiveButton>
            <ActiveButton className="flex-1" onClick={onCancel}>Cancel</ActiveButton>
        </div>
    </div>
}

function CardListItem({card, onEdit, onDelete}) {
    return <div className="flex mb-2 p-5 bg-surface border-surface">
        <div onClick={onEdit} className="flex flex-1 me-2">
            <div className="flex-1">
                {card.front} 
            </div>
            <div className="mx-2">
                {`=>`} 
            </div>
            <div className="flex-1">
                {card.back} 
            </div>
        </div>
        <IconButton icon={DeleteIcon} onClick={onDelete}/>
    </div>
}
export default function Card({isFlipped, card, onClick, swipeHandlers}){
    const onHover = () => {
        const audio = new Audio(SwipeSound);
        audio.play();
    }
    
    const baseStyle = "absolute card-face p-10 bg-on-surface border-surface rounded w-full h-full"

    return <div {...swipeHandlers} className="relative w-64 h-80 mb-2" onMouseEnter={onHover} onClick={onClick}>
        <div className={`${baseStyle} ${isFlipped && "front-turned"}`}>
            <div className="overflow-y-auto h-full w-full">
                {card.front}
            </div>
        </div>
        <div className={`${baseStyle} ${!isFlipped && "back-turned"}`}>
            <div className="overflow-y-auto h-full w-full">
                {card.back}
            </div>
        </div>
    </div>
}
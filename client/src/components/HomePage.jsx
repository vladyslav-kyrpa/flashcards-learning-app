import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate();
    return <>
        <div>Home Page</div>
        <button className="bg-active" onClick={()=>{navigate("/decks")}}>toDeck</button>
    </>
}
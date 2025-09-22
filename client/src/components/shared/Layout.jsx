import { useNavigate } from "react-router-dom";
import NewDeckIcon from "../../assets/images/new-deck-icon.png";
import ProfileIcon from "../../assets/images/profile-icon.png";
import Logo from "../../assets/images/logo.png";

import { IconButton } from "./Buttons";

export default function Layout({children}){
    const navigate = useNavigate();

    const handleOnCreate = () => {
        navigate("/create-deck");
    }

    const handleOnProfile = () => {
        navigate("/profile");
    }

    const handleOnLogo = () => {
        navigate("/");
    }

    return <div className="min-h-screen">
        <div className="p-3 flex items-center justify-between text-center bg-surface">
            <div></div>
            <div onClick={handleOnLogo}>
                <img src={Logo} height={32} width={150}/>
            </div>
            <div>
                <IconButton className="me-2" onClick={handleOnCreate} icon={NewDeckIcon}/>
                <IconButton onClick={handleOnProfile} icon={ProfileIcon}/>
            </div>
        </div>
        <div className="max-w-[500px] h-full mx-auto p-3">
            {children}
        </div>
    </div>
}
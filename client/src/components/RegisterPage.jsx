import { useState } from "react";
import { TextBox } from "./shared/TextBoxes";
import { ActiveButton } from "./shared/Buttons";
import api from "../services/AuthApi.js";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    
    const handleToLogin = () => {
        navigate("/log-in");
    }

    const handleOnRegister = () => {
        if(password !== repeatPassword)
            return; // todo: display error 

        api.register(username, email, password)
            .then((_)=>navigate("/log-in"))
            .catch((error)=>console.error(error)); // todo: display error
    }

    return <div className="h-screen flex items-center justify-center">
        <div className="p-10 max-w-[500px] bg-surface rounded">
            <p className="text-[24px] text-center mb-5">Register new user</p>

            <label className="mb-3">Username</label>
            <TextBox name="username" className="mb-5" placeholder="example.username" 
                value={username} onChange={setUsername}/>

            <label className="mb-3">Email</label>
            <TextBox name="email" className="mb-5" placeholder="example@mail.com" 
                value={email} onChange={setEmail}/>

            <label className="mb-3">Password</label>
            <TextBox name="password" hidden={true} className="mb-5" 
                placeholder="Your password here..."
                value={password} onChange={setPassword}/>

            <label className="mb-3">Repeat password</label>
            <TextBox name="repeat-password" hidden={true} className="mb-5" 
                placeholder="Your password again here..."
                value={repeatPassword} onChange={setRepeatPassword}/>

            <ActiveButton className="w-full mb-2" 
                onClick={handleOnRegister}>Register</ActiveButton>
            <ActiveButton className="w-full" 
                onClick={handleToLogin}>Go to logging-in</ActiveButton>
        </div>
    </div>
}
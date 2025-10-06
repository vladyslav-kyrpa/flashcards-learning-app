import { useState } from "react";
import { TextBox } from "./shared/TextBoxes";
import { ActiveButton } from "./shared/Buttons";
import api from "../services/AuthApi.js";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "./shared/Dialogs.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleToRegister = () => {
        navigate("/register");
    }
    const handleOnLogIn = () => {
        api.login(email, password)
            .then((_) => navigate("/"))
            .catch((error) => {
                setError(error.message);
                console.error(error);
            }); // todo: display error
    }

    return <div className="h-screen flex items-center justify-center">
        <div className="p-10 max-w-[500px] bg-surface rounded">
            <p className="text-[24px] text-center mb-5">Welome to MemoryHub</p>

            <label className="mb-3">Email</label>
            <TextBox name="email" className="mb-5" placeholder="example@mail.com"
                value={email} onChange={setEmail} />

            <label className="mb-3">Password</label>
            <TextBox name="password" hidden={true} className="mb-5" placeholder="Your password here..."
                value={password} onChange={setPassword} />

            <ActiveButton className="w-full mb-2"
                onClick={handleOnLogIn}>Log-in</ActiveButton>
            <ActiveButton className="w-full"
                onClick={handleToRegister}>Go to register</ActiveButton>
        </div>

        {error && <ErrorNotification message={error} onClose={() => setError("")} />}
    </div>
}
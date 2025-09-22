import { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import api from "../services/AuthApi.js";

export default function ProtectedRoute({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(); 
    const navigate = useNavigate();

    useEffect(()=>{
        api.check().then((result)=>{
            setIsAuthenticated(result);
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        })
    }, []);

    if(isAuthenticated == undefined) return <LoadingScreen/>
    if(!isAuthenticated) navigate("/log-in");
    return <>{children}</>
}
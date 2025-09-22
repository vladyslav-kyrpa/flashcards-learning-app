import axios from "axios";

const root = import.meta.env.VITE_API_URL;

export async function login(email, password){
    const response = await axios.post(`${root}/auth/log-in`, 
        {email, password}, 
    );
    localStorage.setItem("token", response.data.token ?? "");
}

export async function register(username, email, password){
    await axios.post(`${root}/auth/register`, 
        {username, email, password},
    );
}

export async function check(){
    try {
        const token = localStorage.getItem("token");
        if(!token) return false;

        await axios.get(`${root}/auth/check`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return true;

    } catch(error) {
        console.log(error);
        return false;
    }

}

export default { login, register, check };
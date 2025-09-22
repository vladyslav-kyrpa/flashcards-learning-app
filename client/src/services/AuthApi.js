import axios from "axios";

const root = "http://localhost:8080/auth";

export async function login(email, password){
    const response = await axios.post(`${root}/log-in`, 
        {email, password}, 
        //{ withCredentials: true }
        );
    localStorage.setItem("token", response.data.token ?? "");
}

export async function register(username, email, password){
    await axios.post(`${root}/register`, 
        {username, email, password},
        //{ withCredentials: true }
        );
}

export async function check(){
    try{
        const token = localStorage.getItem("token");
        if(!token) return false;

        await axios.get(`${root}/check`, {
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
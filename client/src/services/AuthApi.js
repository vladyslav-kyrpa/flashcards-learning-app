import axios from "axios";

const root = import.meta.env.VITE_API_URL;

export async function login(email, password) {
    try {
        const response = await axios.post(`${root}/auth/log-in`,
            { email, password },
        );
        localStorage.setItem("token", response.data.token ?? "");
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function register(name, email, password) {
    try {
        await axios.post(`${root}/auth/register`,
            { name, email, password },
        );
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function check() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return false;

        await axios.get(`${root}/auth/check`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}

export function logout() {
    localStorage.setItem("token", "");
}

export default { login, register, check, logout };
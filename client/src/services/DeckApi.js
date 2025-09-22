import axios from "axios";

const root = import.meta.env.VITE_API_URL;

export async function getList(){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    const response = await axios.get(`${root}/decks/`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export async function get(id){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    const response = await axios.get(`${root}/decks/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export async function create(deck){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    await axios.post(`${root}/decks/create`, deck, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export async function update(id, deck){
    const token = localStorage.getItem("token");
    if(!token) return false;

    await axios.post(`${root}/decks/update/${id}`, deck, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export default { getList, get, create, update };
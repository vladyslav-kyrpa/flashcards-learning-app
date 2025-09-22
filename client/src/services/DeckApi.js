import axios from "axios";

const root = "http://localhost:8080/decks";

export async function getList(){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    const response = await axios.get(`${root}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export async function get(id){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    const response = await axios.get(`${root}/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export async function create(deck){
    const token = localStorage.getItem("token");
    if(!token) throw Error("No auth token");

    await axios.post(`${root}/create`, deck, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export async function update(id, deck){
    const token = localStorage.getItem("token");
    if(!token) return false;

    await axios.post(`${root}/update/${id}`, deck, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export default { getList, get, create, update };
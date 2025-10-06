import axios from "axios";

const root = import.meta.env.VITE_API_URL;

export async function getList() {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");

    try {
        const response = await axios.get(`${root}/decks/`, {
            headers: getAuthHeader(token)
        });
        return response.data;
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function get(id) {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");

    try {
        const response = await axios.get(`${root}/decks/${id}`, {
            headers: getAuthHeader(token)
        });
        return response.data;
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function create(deck) {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");

    try {
        await axios.post(`${root}/decks/create`, deck, {
            headers: getAuthHeader(token)
        });
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function update(id, deck) {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        await axios.post(`${root}/decks/update/${id}`, deck, {
            headers: getAuthHeader(token)
        });
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function remove(id) {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        await axios.post(`${root}/decks/remove/${id}`, {}, {
            headers: getAuthHeader(token)
        });
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

function getAuthHeader(token) {
    return {
        "Authorization": `Bearer ${token}`
    }
}

export default { getList, get, create, update, remove };
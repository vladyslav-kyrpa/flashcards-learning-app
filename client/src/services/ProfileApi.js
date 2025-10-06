import axios from "axios";

const root = import.meta.env.VITE_API_URL;

export async function getProfile(id) {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");
    try {
        const response = await axios.get(`${root}/profiles/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function getCurrent() {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");
    try {
        const response = await axios.get(`${root}/profiles`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export async function updateProfile(profile) {
    const token = localStorage.getItem("token");
    if (!token) throw Error("No auth token");
    try {
        const response = await axios.post(`${root}/profiles/update`,
            profile,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw Error(error?.response?.data?.error ?? error.message);
    }
}

export default { getProfile, getCurrent, updateProfile }
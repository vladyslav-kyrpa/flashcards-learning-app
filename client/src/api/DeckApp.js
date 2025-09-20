import axios from "axios";

const root = "http://localhost:8080/decks";

export async function getList(){
    var response = await axios.get(`${root}`);
    if(response.status != 200)
        throw Error(response.data);
    return response.data;
}

export async function get(id){
    var response = await axios.get(`${root}/${id}`);
    if(response.status != 200)
        throw Error(response.data);
    return response.data;
}

export async function create(deck){
    var response = await axios.post(`${root}/create`, deck);
    if(response.status != 200)
        throw Error(response.data);
}

export async function update(id, deck){
    var response = await axios.post(`${root}/update/${id}`, deck);
    if(response.status != 200)
        throw Error(response.data);
}

export default { getList, get, create, update };
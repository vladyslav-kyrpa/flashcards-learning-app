const decks = [];
const counter = { value: 0};

export async function create(deck){
    const id = counter.value;
    deck.id = String(id);
    decks.push(deck);
    counter.value++;
}

export async function remove(id){
    return new Promise((resolve) =>{
        const index = decks.findIndex(e=>e.id == id);
        if(index === -1) throw Error("Deck not found");
        decks.splice(index, 1);
        resolve();
    });
}

export async function update(id, deck){
    return new Promise((resolve) =>{
        deck.id = id;
        const index = decks.findIndex(e=>e.id == id);
        if(index === -1) throw Error("Deck not found");
        decks[index] = deck;
        resolve();
    });
}

export async function getOne(id){
    return new Promise((resolve) =>{
        resolve(decks.find(deck=>deck.id == id));
    });
}

export async function getAll(){
    return new Promise((resolve) =>{
        resolve(decks.map((deck)=>{
            return { id:deck.id, title:deck.title} 
        }));
    });
}

export default {create, remove, update, getAll, getOne};
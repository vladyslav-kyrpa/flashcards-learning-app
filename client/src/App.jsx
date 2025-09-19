import { HashRouter, Route, Routes } from "react-router-dom"
import DeckPage from "./components/deck/DeckPage"
import DeckListPage from "./components/DeckListPage"
import CreateDeckPage from "./components/deck/CreateDeckPage"
import EditDeckPage from "./components/deck/EditDeckPage"

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<DeckListPage/>}/>
      <Route path="/decks" element={<DeckListPage/>}/>
      <Route path="/create-deck" element={<CreateDeckPage/>}/>
      <Route path="/deck/:id" element={<DeckPage/>}/>
      <Route path="/edit-deck/:id" element={<EditDeckPage/>}/>
    </Routes>
  </HashRouter>
}

export default App

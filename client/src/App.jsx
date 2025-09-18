import { HashRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./components/HomePage"
import { DeckPage } from "./components/deck/DeckPage"
import { DeckListPage } from "./components/DeckListPage"

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/deck/:id" element={<DeckPage/>}/>
      <Route path="/decks" element={<DeckListPage/>}/>
    </Routes>
  </HashRouter>
}

export default App

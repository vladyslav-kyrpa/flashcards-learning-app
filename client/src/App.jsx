import { HashRouter, Outlet, Route, Routes } from "react-router-dom"
import DeckPage from "./components/deck/DeckPage"
import DeckListPage from "./components/DeckListPage"
import CreateDeckPage from "./components/deck/CreateDeckPage"
import EditDeckPage from "./components/deck/EditDeckPage"
import Layout from "./components/shared/Layout"

const LayoutWrapper = () => {
  return <Layout>
    <Outlet/>
  </Layout>
}

function App() {
  return <HashRouter>
    <Routes>
      <Route element={<LayoutWrapper/>}>
        <Route path="/" element={<DeckListPage/>}/>
        <Route path="/decks" element={<DeckListPage/>}/>
        <Route path="/create-deck" element={<CreateDeckPage/>}/>
        <Route path="/deck/:id" element={<DeckPage/>}/>
        <Route path="/edit-deck/:id" element={<EditDeckPage/>}/>
      </Route>
    </Routes>
  </HashRouter>
}

export default App

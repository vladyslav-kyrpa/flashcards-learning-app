import { HashRouter, Outlet, Route, Routes } from "react-router-dom"
import DeckPage from "./components/deck/DeckPage"
import DeckListPage from "./components/DeckListPage"
import CreateDeckPage from "./components/deck/CreateDeckPage"
import EditDeckPage from "./components/deck/EditDeckPage"
import Layout from "./components/shared/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"

const LayoutWrapper = () => {
  return <Layout>
    <Outlet />
  </Layout>
}

const ProtectedRouteWrapper = () => {
  return <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
}

function App() {
  return <HashRouter>
    <Routes>
      <Route element={<LayoutWrapper/>}>
        <Route element={<ProtectedRouteWrapper/>}>
          <Route path="/" element={<DeckListPage/>}/>
          <Route path="/decks" element={<DeckListPage/>}/>
          <Route path="/create-deck" element={<CreateDeckPage/>}/>
          <Route path="/deck/:id" element={<DeckPage/>}/>
          <Route path="/edit-deck/:id" element={<EditDeckPage/>}/>
        </Route>
      </Route>
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </HashRouter>
}

export default App;

import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return <BrowserRouter><div className="app-shell"><Navbar /><div className="app-body"><Sidebar /><main className="main-content"><AppRoutes /></main></div></div></BrowserRouter>
}

export default App

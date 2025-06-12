import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainChat from './pages/MainChat'
import LandingPage from './pages/LandingPage'

function App() {
  

  return (
    <Router>
        <Routes>
          <Route path={'/'} element={<LandingPage />}></Route>
          <Route path={'/chat'} element={<MainChat />}></Route>
        </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainChat from './pages/MainChat'

function App() {
  

  return (
    <Router>
        <Routes>
          <Route path={'/'} element={<MainChat />}></Route>
        </Routes>
    </Router>
  )
}

export default App

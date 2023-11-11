import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Routes>
        {isLoggedIn && (
          <Route path="/" element={<p>Home page</p>} />
        )}
        {isLoggedIn && (
          <Route path="/profile" element={<p>profile page</p>} />
        )}

        {!isLoggedIn && (
          <Route path="/login" element={<LoginPage/>} />
        )}
        {isLoggedIn && (
          <Route path="*" element={<p>Home page</p>} />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<LoginPage/>} />
        )}
      </Routes>
    </>
  )
}

export default App

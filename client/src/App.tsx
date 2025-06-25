
import { Route, Routes } from 'react-router'
import './App.css'
import MainOutlet from './components/outlets/MainOutlet'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'


function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<MainOutlet />}>         
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<HomePage />} />          
        </Route>
    </Routes>
    </>
  )
}
 
export default App


import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import MainOutlet from './components/outlets/MainOutlet'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import PostDetailsPage from './components/pages/PostDetailsPage'
import AddNewPost from './components/pages/NewPostPage'
import { useContext } from 'react'
import UserContext from './contexts/UsersContext'
import type { UserContextTypes } from './types'


function App() {
    const { loggedInUser } = useContext(UserContext) as UserContextTypes;
 
    return (
    <>
      <Routes>
        <Route path="" element={<MainOutlet />}>         
          <Route path="/register" element={loggedInUser ? <Navigate to='/'/> : <RegisterPage />} />
          <Route path="/login" element={loggedInUser ? <Navigate to='/'/> : <LoginPage />} />
          <Route path="/details/:id" element={<PostDetailsPage />} />
          <Route path="/newPost" element={loggedInUser ? <AddNewPost /> : <Navigate to='/'/>} />
          <Route index element={<HomePage />} />          
        </Route>
    </Routes>
    </>
  )
}
 
export default App

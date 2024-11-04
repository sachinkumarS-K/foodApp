import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import SignIn from './components/SignIn.jsx'
import Browse from './pages/Browse.jsx'
import UserConxtextProvider from './context/UserContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

        <Route path='/' element = {<App/>} >
      <Route path='' element={<Home />} />
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/browse' element = {<Browse/>} />
    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserConxtextProvider>
      <RouterProvider router={router} />
    </UserConxtextProvider>
  </StrictMode>,
)

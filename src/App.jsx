import React from 'react'
import Instructor from './Components/Users/Instructor/Instructor'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import HomePage from './Components/HomePage/HomePage'
import Admin from './Components/Users/Admin/Admin'

// Import React react dom
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import SideBar from './Components/Users/Instructor/Components/SideBar Section/SideBar'
import Main from './Components/Users/Admin/Components/Body Section/Main/main'

//Create router
const router = createBrowserRouter([
    {
        path: '/login',
        element: <div><Login /></div>
    },
    {
        path: '/register',
        element: <div><Register /></div>
    },
    {
        path: '/instructor',
        element: <div><Instructor /></div>
    },
    {
        path: '/home',
        element: <div>
            <HomePage />
        </div>
    },
    {
        path: '/admin/*',
        element: <div>
            <Admin />
        </div>
    },

])


const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
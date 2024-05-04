import React from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import HomePage from './Components/HomePage/HomePage'

// Import React react dom
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

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
        path: '/dashboard',
        element: <div><Dashboard /></div>
    },
    {
        path: '/home',
        element: <div>
            <HomePage />
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
import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import Home from './Components/Home/Home'
import Search from './Components/Search/Search'
import Support from './Components/Support/Support'
import Info from './Components/Info/Info'
import Rooms from './Components/Rooms/Rooms'
import Participants from './Components/Participants/Participants'
import Subscribers from './Components/Subscribers/Subscribers'
import Footer from './Components/Footer/Footer'
import Classes from './Components/Classes/Classes'
import Intro from './Components/Intro/Intro'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import SideBar from './Components/Dashboard/Components/SideBar Section/SideBar'
import Body from './Components/Dashboard/Components/Body Section/Body'

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
            <Navbar />
            <Home />
            <Intro />
            <Rooms />
            <Search />
            <Support />
            <Classes />
            <Info />
            <Participants />
            <Subscribers />
            <Footer />
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
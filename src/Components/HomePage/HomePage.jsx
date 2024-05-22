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

const HomePage = () => {
    return (
        <div className='homePage'>
            <Navbar />
            <Home />
            <Intro />
            <Rooms />
            <Search />
            <Support />
            {/* <Classes /> */}
            <Info />
            <Participants />
            <Subscribers />
            <Footer />
        </div>
    )
}

export default HomePage
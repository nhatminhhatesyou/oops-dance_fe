import React, { useRef } from 'react';
import Navbar from './Components/NavBar/Navbar';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Support from './Components/Support/Support';
import Info from './Components/Info/Info';
import Rooms from './Components/Rooms/Rooms';
import Participants from './Components/Participants/Participants';
import Subscribers from './Components/Subscribers/Subscribers';
import Footer from './Components/Footer/Footer';
import TimeTable from './Components/Classes/TimeTable';
import Intro from './Components/Intro/Intro';
import ClassInfo from './Components/Classes/ClassInfo';
import Instructor from './Components/Classes/Instructor';

const HomePage = () => {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const offersRef = useRef(null);
    const roomsRef = useRef(null);
    const classesRef = useRef(null);

    const scrollToSection = (sectionRef) => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='homePage'>
            <Navbar scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, offersRef, roomsRef, classesRef }} />
            <div ref={homeRef}>
                <Home />
            </div>
            <div ref={aboutRef} >
                <Intro />
            </div>
            <div ref={roomsRef}>
                <Rooms />
            </div>
            <Search />
            <Support />
            <div ref={classesRef}>
                <ClassInfo />
                <Instructor />
                <TimeTable />
            </div>
            <Info />
            <Participants />
            <Subscribers />
            <Footer />
        </div>
    );
}

export default HomePage;

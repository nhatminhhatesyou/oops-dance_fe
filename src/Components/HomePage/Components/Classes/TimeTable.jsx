import React from 'react'

//Imported Images ===========>
import timetable_bg from "../../Assets_HomePage/timetable_background.png"
import class_bg from "../../Assets_HomePage/timetable-class-bg.png"
import instructor_1 from "../../Assets_HomePage/dolinh.png"
import instructor_2 from "../../Assets_HomePage/chaeng.png"

const TimeTable = () => {
    return (
        <div className="classes container section flex">
            <div className="sectionContainer flex">
                <div className="background">
                    <img src={timetable_bg} />
                </div>
                <div className="titlesDiv">
                    <h1>Explore our dance classes!</h1>
                    <h1>April</h1>
                    <span>2024</span>
                </div>

                <div className='timeTableDiv flex'>
                    <table >
                        <thead>
                            <tr className='days'>
                                <th></th>
                                <th>T2</th>
                                <th>T3</th>
                                <th>T4</th>
                                <th>T5</th>
                                <th>T6</th>
                                <th>T7</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* session 1 */}
                            <tr>
                                <td className='time'>18:00</td>
                                <td >
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_1} className="instructor" />
                                        <span>Trending</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>

                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Kpop 1</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_2} className="instructor" />
                                        <span>Girl Style1</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Girl Style1</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Kpop 1</span>
                                    </div>
                                </td>
                            </tr>

                            {/* session 2 */}
                            <tr>
                                <td className='time'>20:00</td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span>Trending</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default TimeTable
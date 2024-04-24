import React from 'react'

//Imported Images ===========>
import timetable_bg from "../../assets/timetable_background.png"
import class_bg from "../../assets/timetable-class-bg.png"
import instructor_1 from "../../assets/dolinh.png"
import instructor_2 from "../../assets/chaeng.png"

const Classes = () => {
    return (
        <div className="classes container section">
            <div className="sectionContainer flex">
                <div className="background">
                    <img src={timetable_bg} />
                </div>
                <div className="titlesDiv">
                    <h1>Lịch học tháng 4</h1>
                    <span>2024</span>
                </div>

                <table >
                    <tr className='days'>
                        <th></th>
                        <th>T2</th>
                        <th>T3</th>
                        <th>T4</th>
                        <th>T5</th>
                        <th>T6</th>
                        <th>T7</th>
                    </tr>

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
                </table>

            </div>
        </div>
    )
}

export default Classes
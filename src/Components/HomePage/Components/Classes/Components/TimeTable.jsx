import React from 'react'
import { Image, Button } from '@nextui-org/react'

//Imported Images ===========>
import timetable_bg from "../../../Assets_HomePage/timetable_background.png"
import class_bg from "../../../Assets_HomePage/timetable-class-bg.png"
import instructor_dolinh from "../../../Assets_HomePage/dolinh.png"
import instructor_chaeng from "../../../Assets_HomePage/chaeng.png"
import instructor_ami from "../../../Assets_HomePage/ami_rmbg.png"
import instructor_bin from "../../../Assets_HomePage/bin_rmbg.png"
import instructor_ducbo from "../../../Assets_HomePage/ducbo_rmbg.png"

//Imported icons
import { TiSocialFacebook } from "react-icons/ti";


const TimeTable = () => {
    return (
        <div className="classes section flex">
            <div className="sectionContainer flex">
                <div className="background">
                    <img src={timetable_bg} />
                </div>
                <div className="titlesDiv">
                    <h1>Explore our dance classes!</h1>
                    <h1>July</h1>
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
                            <tr>
                                <td className='time'>18:00</td>
                                <td >
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_dolinh} className="instructor" />
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
                                        <img src={instructor_ducbo} className="instructor" />
                                        <span>Kpop 1</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_chaeng} className="instructor" />
                                        <span>Girl Style 1</span>
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
                                        <img src={instructor_dolinh} className="instructor" />
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
                                        <img src={instructor_chaeng} className="instructor" />
                                        <span>Girl Style 1</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_ducbo} className="instructor" />
                                        <span>Kpop 1</span>
                                    </div>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <span></span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className='time'>20:00</td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_bin} className="instructor" />
                                        <span>Kpop 2</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_dolinh} className="instructor" />
                                        <span>Inter Choreo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_ami} className="instructor" />
                                        <span>Girl Style 2</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_bin} className="instructor" />
                                        <span>Kpop 2</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_dolinh} className="instructor" />
                                        <span>Inter Choreo</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='dance-class'>
                                        <img src={class_bg} className='class-bg' />
                                        <img src={instructor_ami} className="instructor" />
                                        <span>Girl Style 2</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='infoDiv mt-4 flex flex-col gap-2 text-center'>
                    <h1>Go to our fanpage to get more information</h1>
                    <Button
                        as="a"
                        className="facebook-button"
                        aria-label="Facebook"
                        variant="bordered"
                        href="https://www.facebook.com/oopsdancestudio"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TiSocialFacebook className='icon' /> Facebook
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default TimeTable
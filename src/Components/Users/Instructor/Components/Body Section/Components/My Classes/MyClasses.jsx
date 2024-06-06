import React, { useEffect, useState } from 'react';
import './MyClasses.css'
import { useAuth } from '../../../../../../../AuthContext'


//Imported images ==================>
import classImagePlaceHolder from '../../../../Assets_Instructor/logo2.png'
import axios from '../../../../../../../axiosConfig'


const MyClasses = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';

    const { user } = useAuth();
    const [classes, setClasses] = useState([]);

    const fetClasses = () => {
        axios.get(`/class-list/?instructor_id=${user.id}`)
            .then((response) => {
                setClasses(response.data)
                console.log("User id: ", user.id)
                console.log("Fetched data: ", response.data)
                console.log("Fetched classes: ", classes)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetClasses();
    }, []);

    return (
        <div className='myClasses'>
            {classes.map((classItem) => (
                <div className="sectionContainer singleItem flex">
                    <div className='classImgDiv flex'>
                        <div className="img">
                            <img src={`${cloudinaryBaseUrl}/${classItem?.image}` || classImagePlaceHolder} />
                        </div>
                        <h2>{classItem.class_name}</h2>
                    </div>

                    <div className="classDetails cards flex">
                        <div className="heading1">
                            <h2>DETAILS</h2>
                        </div>
                        <div className="singleContent flex">
                            <div className="heading2">
                                <h3>Schedule</h3>
                            </div>
                            <div className="cards">
                                {classItem.schedules.map((schedule) => (
                                    <h3>
                                        {schedule.day_of_the_week_value} : <p>From {schedule.start_time} to {schedule.end_time}</p>
                                    </h3>
                                ))}
                            </div>
                        </div>
                        <div className="singleContent flex">
                            <div className="heading2">
                                <h3>Room</h3>
                            </div>
                            <div className="cards">
                                <h3>Room {classItem.room_id} - {classItem.room_detail.size}</h3>
                            </div>
                        </div>
                        <div className="singleContent flex">
                            <div className="heading2">
                                <h3>Lesson's Detail</h3>
                            </div>
                            <div className="cards">
                                <h3>{classItem.class_lesson}</h3>
                            </div>
                        </div>
                        <div className="singleContent flex">
                            <div className="heading2">
                                <h3>Class's members</h3>
                            </div>
                            <div className="cards tableDiv flex">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Student's Name</th>
                                            <th>Student ID</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {classItem.students.map((student, index) => (
                                            <tr key={student.id}>
                                                <td>{index + 1}</td>
                                                <td>{student.username}</td>
                                                <td>{student.id}</td>
                                                <td>{student.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* <div className="sectionContainer singleItem flex">
                <div className='classImgDiv flex'>
                    <div className="img">
                        <img src={logo} />
                    </div>
                    <h2>Class Name</h2>
                </div>

                <div className="classDetails cards flex">
                    <div className="heading1">
                        <h2>DETAILS</h2>
                    </div>
                    <div className="singleContent flex">
                        <div className="heading2">
                            <h3>Schedule</h3>
                        </div>
                        <div className="cards">
                            Day-of-the-week : From "time" to "time"
                        </div>
                    </div>
                    <div className="singleContent flex">
                        <div className="heading2">
                            <h3>Room</h3>
                        </div>
                        <div className="cards">
                            Room ID
                        </div>
                    </div>
                    <div className="singleContent flex">
                        <div className="heading2">
                            <h3>Lesson's Detail</h3>
                        </div>
                        <div className="cards">
                            Song's Name - Category
                        </div>
                    </div>
                    <div className="singleContent flex">
                        <div className="heading2">
                            <h3>Class's members</h3>
                        </div>
                        <div className="cards">
                            Students list
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default MyClasses
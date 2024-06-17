import React, { useEffect, useState } from 'react';
import './MyClasses.css'
import { useAuth } from '../../../../../../../AuthContext'


//Imported images ==================>
import classImagePlaceHolder from '../../../../Assets_Instructor/logo2.png'
import axios from '../../../../../../../axiosConfig'

//Imported Template =====================>
import SmallTableTemplate from '../../../../../../SmallTable/SmallTableTemplate';

const MyClasses = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const fetClasses = () => {
        axios.get(`/class-list/?instructor_id=${user.id}`)
            .then((response) => {
                setClasses(response.data)
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

                            <div className="studentTable cards">
                                <SmallTableTemplate
                                    data={
                                        classItem.students.map((student, index) => ({
                                            id: student.id,
                                            no: index + 1,
                                            name: student.full_name,
                                            username: student.username,
                                            avatar: student.avatar,
                                            studentId: student.id,
                                            contact: student.contact_number,
                                            dob: student.date_of_birth,
                                            email: student.email,
                                        }))
                                    }
                                    columns={[
                                        { name: "No.", uid: "no" },
                                        { name: "Student", uid: "user" },
                                        { name: "Contact", uid: "contact" },
                                        { name: "DOB", uid: "dob" },
                                    ]}
                                    rowsPerPage={4}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MyClasses
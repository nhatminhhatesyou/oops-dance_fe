import React, { useEffect, useState } from 'react'
import Axios from '../../../../../../../axiosConfig';

//IMPORTED ICON ================>
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";


const Schedule = () => {
    //for listing-schedule api
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        Axios.get('/schedule-list/')
            .then((response) => {
                setSchedule(response.data); // Lưu trữ danh sách các lớp vào state
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //ADD-SCHEDULE API =====================================================================>
    const [day_of_the_week, setDay_of_the_week] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    // Show the form when  
    // Add-schedule-button clicked =======>
    const [activeForm3, setActiveForm3] = useState('formDiv flex')
    const showForm3 = () => {
        console.log("Mở FORM NÈK")
        setActiveForm3('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm3 = () => {
        setActiveForm3('formDiv flex')
        setBlur('blurLayer')
    }

    //SHOW ADD-schedule STATUS =================================================================>
    const [addScheStatus, setAddscheStatus] = useState('')
    const [statusAddScheHolder, setAddScheStatusHolder] = useState('message')

    // useEffect(() => {

    //     if (addClassStatus !== '') {
    //         setAddScheStatusHolder('showMessage');
    //         setTimeout(() => {
    //             setAddScheStatusHolder('message')
    //             addScheStatus('')
    //         }, 3000);
    //     }


    // }, [addClassStatus])



    //ADD-SCHEDULE FORM SUBMIT =========================================================>
    const uploadSchedule = (e) => {
        e.preventDefault();
        //Use Axios to create API that connects to the server
        Axios.post('/add_schedule/', {
            day_of_the_week: day_of_the_week,
            start_time: startTime,
            end_time: endTime
        }).then((response) => {
            console.log(response)
            console.log(response.data.message)
            if (response.data.message === "Success") {
                setAddscheStatus(response.data.message)
                fetchSchedule()
            }
        }).catch((error) => {
            // if (error.response) {
            //     // Server responsed an error
            //     console.log("all error data:")
            //     console.log(error.response.data);

            //     if (error.response.data.non_field_errors) {
            //         console.log("non_field_errors:")
            //         console.log(error.response.data.non_field_errors['0'])
            //         setAddClassStatus('Class already exists')
            //     }

            //     else if (error.response.data.instructor_id) {
            //         console.log("no instructor message:")
            //         console.log(error.response.data.instructor_id)
            //         setAddClassStatus("Invalid IntructorID")
            //     }
            // } else if (error.request) {
            //     // Request sent but no response
            //     console.log(error.request);
            // } else {
            //     // error init request
            //     //console.log('Error', error.message);
            // }
        })
    }

    //EDIT ACTION & DELETE ACTION for SCHEDULE ====================================================>

    //Delete ============>
    const handleDeleteSchedule = (scheduleId) => {
        Axios.delete(`/schedule/${scheduleId}/`)
            .then((response) => {
                alert("Lịch học đã được xóa.");
                fetchClasses();
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi xóa lịch học.");
            });
    };

    //Edit =============>

    // Show the edit form when  
    // Edit-schedule-button clicked =========>
    const [activeForm4, setActiveForm4] = useState('formDiv flex')
    const [scheduleId, setScheduleId] = useState('')
    const [blur, setBlur] = useState('blurLayer')

    const showForm4 = (scheduleData) => {
        console.log("Mở FORM NÈK")

        setScheduleId(scheduleData.id)
        setDay_of_the_week(scheduleData.day_of_the_week)
        setStartTime(scheduleData.start_time)
        setEndTime(scheduleData.end_time)

        setActiveForm4('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm4 = () => {
        setActiveForm4('formDiv flex')
        setBlur('blurLayer')
    }

    //Save changes button =============>
    const handleEditSchedule = () => {
        Axios.patch(`/schedule/${scheduleId}/`, {
            day_of_the_week: day_of_the_week,
            start_time: startTime,
            end_time: endTime
        })
            .then((response) => {
                alert("Thông tin lịch học đã được cập nhật.");
                fetchClasses();
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi cập nhật thông tin lịch học.");
            });
    };


    return (
        <div className="classScheduleDiv sectionContainer">
            {/* ADD-SCHEDULE FORM */}
            <div className={activeForm3}>
                <form action="" className="form grid" >
                    <IoIosCloseCircle className='icon' onClick={removeForm3} />
                    <h3>Add Schedule</h3>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="instructorID">Day of the week</label>
                        <div className="input flex">
                            <input type="text" id='instructorID' placeholder='Enter' onChange={(event) => {
                                setDay_of_the_week(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="price">Start Time</label>
                        <div className="input flex">
                            <input type="text" id='price' placeholder='Enter' onChange={(event) => {
                                setStartTime(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="price">End Time</label>
                        <div className="input flex">
                            <input type="text" id='price' placeholder='Enter' onChange={(event) => {
                                setEndTime(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/* ADD-CLASS STATUS */}
                    {/* <span className={statusHolder}>{addClassStatus}</span> */}

                    {/* SUBMIT BUTTON */}
                    <button type='submit' className='btn' onClick={uploadSchedule}>
                        <span>Upload Schedule</span>
                    </button>
                </form>
            </div>

            {/* EDIT-SCHEDULE FORM */}
            <div className={activeForm4}>
                <form action="" className="form grid" >
                    <IoIosCloseCircle className='icon' onClick={removeForm4} />
                    <h3>Edit Schedule</h3>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="instructorID">Day of the week</label>
                        <div className="input flex">
                            <input type="text" id='instructorID' placeholder='Enter' value={day_of_the_week} onChange={(event) => {
                                setDay_of_the_week(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="price">Start Time</label>
                        <div className="input flex">
                            <input type="text" id='price' placeholder='Enter' value={startTime} onChange={(event) => {
                                setStartTime(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/*  INPUT */}
                    <div className="inputDiv">
                        <label htmlFor="price">End Time</label>
                        <div className="input flex">
                            <input type="text" id='price' placeholder='Enter' value={endTime} onChange={(event) => {
                                setEndTime(event.target.value)
                            }} />
                        </div>
                    </div>

                    {/* ADD-CLASS STATUS */}
                    {/* <span className={statusHolder}>{addClassStatus}</span> */}

                    {/* SUBMIT BUTTON */}
                    <button type='submit' className='btn' onClick={handleEditSchedule}>
                        <span>Save Changes</span>
                    </button>
                </form>
            </div>

            <div className="tableDiv flex">
                <h2>Schedule</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Schedule ID</th>
                            <th>Day of the week</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((scheduleItem) => (
                            <tr key={scheduleItem.id}>
                                <td>{scheduleItem.id}</td>
                                <td>{scheduleItem.day_of_the_week_value}</td>
                                <td>{scheduleItem.start_time}</td>
                                <td>{scheduleItem.end_time}</td>
                                <td>
                                    <BsFillTrashFill className='icon' onClick={() => handleDeleteSchedule(scheduleItem.id)} />
                                    <BsFillPencilFill className='icon' onClick={() => showForm4(scheduleItem)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn" onClick={showForm3}>Add Schedule</button>
            </div>

            <div className={blur}></div>

        </div>
    )
}

export default Schedule
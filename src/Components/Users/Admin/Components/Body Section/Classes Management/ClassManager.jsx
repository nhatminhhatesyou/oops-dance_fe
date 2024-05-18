import React, { useEffect, useState } from 'react'
import './ClassManager.css'
import Axios from 'axios';

//IMPORTED ICON ================>
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";



const ClassManager = () => {

    //CLASS-LIST SECTION ========================================================>
    //ADD-CLASS API
    const [className, setClassName] = useState('')
    const [instructorID, setInstructor] = useState('')
    const [price, setPrice] = useState('')


    //Show the form when  Add-Class-button clicked
    const [activeForm1, setActiveForm1] = useState('formDiv flex')
    const [blur, setBlur] = useState('blurLayer')
    const showForm1 = () => {
        console.log("Mở FORM NÈK")
        setActiveForm1('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm1 = () => {
        setActiveForm1('formDiv flex')
        setBlur('blurLayer')
    }

    //SHOW ADD-CLASS STATUS =========================================================>
    const [addClassStatus, setAddClassStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')

    useEffect(() => {
        if (addClassStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message')
                setAddClassStatus('')
            }, 3000);
        }


    }, [addClassStatus])


    //ADD-CLASS FORM SUBMIT =========================================================>
    const uploadClass = (e) => {
        e.preventDefault();
        //Use Axios to create API that connects to the server
        Axios.post('http://127.0.0.1:8000/add_class/', {
            class_name: className,
            instructor_id: instructorID,
            price: price,
            schedules_ids: scheduleIds
        }).then((response) => {
            console.log(response)
            console.log(response.data.message)
            if (response.data.message === "Success") {
                setAddClassStatus(response.data.message)
                fetchClasses()
            }
        }).catch((error) => {
            if (error.response) {
                // Server responsed an error
                console.log("all error data:")
                console.log(error.response.data);

                if (error.response.data.non_field_errors) {
                    console.log("non_field_errors:")
                    console.log(error.response.data.non_field_errors['0'])
                    setAddClassStatus('Class already exists')
                }

                else if (error.response.data.instructor_id) {
                    console.log("no instructor message:")
                    console.log(error.response.data.instructor_id)
                    setAddClassStatus("Invalid IntructorID")
                }
            } else if (error.request) {
                // Request sent but no response
                console.log(error.request);
            } else {
                // error init request
                //console.log('Error', error.message);
            }
        })
    }

    //EDIT ACTION & DELETE ACTION for CLASSES ==============================================>
    const handleDeleteClass = (classId) => {
        Axios.delete(`http://127.0.0.1:8000/class/${classId}/`)
            .then((response) => {
                alert("Lớp học đã được xóa.");
                console.log("Lớp học đã được xóa.")
                fetchClasses();
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                console.log("Có lỗi xảy ra khi xóa lớp học.")
                alert("Có lỗi xảy ra khi xóa lớp học.");
            });
    };

    const handleEditClass = () => {
        Axios.patch(`http://127.0.0.1:8000/class/${classId}/`, {
            class_name: className,
            instructor_id: instructorID,
            price: price,
            schedules_ids: scheduleIds
        })
            .then((response) => {
                alert("Thông tin lớp học đã được cập nhật.");
                console.log("Thông tin lớp học đã được cập nhật.");
                fetchClasses(); // Gọi lại hàm fetchClasses để cập nhật danh sách lớp học trên giao diện
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi cập nhật thông tin lớp học.");
            });
    };

    //Show the form when Edit-Class-button clicked
    const [activeForm2, setActiveForm2] = useState('formDiv flex')
    const [classId, setClassId] = useState('')
    const [scheduleIds, setScheduleIds] = useState([])

    const showForm2 = (classData) => {
        setClassId(classData.id)
        setClassName(classData.class_name)
        setInstructor(classData.instructor_id)
        setPrice(classData.price)
        const IDs = classData.schedules.map(schedule => schedule.id);
        setScheduleIds(IDs)

        console.log("Mở FORM NÈK")
        setActiveForm2('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm2 = () => {
        setActiveForm2('formDiv flex')
        setBlur('blurLayer')
    }

    //CLEAR THE FORM ON SUBMIT===================================================================>
    const onSubmit = () => {
        setClassName('')
        setInstructor('')
        setPrice('')
    }

    //FOR LISTING-CLASSES API===================================================================>
    const [classes, setClasses] = useState([]); // State lưu trữ danh sách các lớp
    useEffect(() => {
        // Gọi API khi component được mount
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        Axios.get('http://127.0.0.1:8000/class-list/')
            .then((response) => {
                setClasses(response.data); // Lưu trữ danh sách các lớp vào state
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //CLASS-SCHEDULE SECTION ===================================================================>

    //for listing-schedule api
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        Axios.get('http://127.0.0.1:8000/schedule-list/')
            .then((response) => {
                setSchedule(response.data); // Lưu trữ danh sách các lớp vào state
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //EDIT ACTION & DELETE ACTION for SCHEDULE ====================================================>
    const handleDeleteSchedule = (scheduleId) => {
        Axios.delete(`http://127.0.0.1:8000/scheudle/${scheduleId}/`)
            .then((response) => {
                alert("Lịch học đã được xóa.");
                fetchClasses();
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi xóa lịch học.");
            });
    };

    const handleEditSchedule = (scheduleId) => {
        // Lấy thông tin chi tiết của lớp học
        axios.get(`/api/class/${scheduleId}/`)
            .then((response) => {
                // Hiển thị thông tin chi tiết trong form chỉnh sửa
                // Ví dụ: setClassData(response.data);
                // Mở modal hoặc chuyển hướng người dùng đến trang chỉnh sửa
            })
            .catch((error) => {
                console.error("Có lỗi: ", error);
                alert("Có lỗi xảy ra khi lấy thông tin lớp học.");
            });
    };

    //ADD-SCHEDULE API =====================================================================>
    const [day_of_the_week, setDay_of_the_week] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    //Show the form when  Add-schedule-button clicked
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

    useEffect(() => {
        if (addClassStatus !== '') {
            setAddScheStatusHolder('showMessage');
            setTimeout(() => {
                setAddScheStatusHolder('message')
                addScheStatus('')
            }, 3000);
        }


    }, [addClassStatus])

    //ADD-SCHEDULE FORM SUBMIT =========================================================>
    const uploadSchedule = (e) => {


        e.preventDefault();
        //Use Axios to create API that connects to the server
        Axios.post('http://127.0.0.1:8000/add_schedule/', {
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

        console.log(day_of_the_week)
        console.log(startTime)
        console.log(endTime)
    }

    return (
        <div className='classManager flex'>

            {/* CLASS LISTING SECTION */}
            <div className="classListDiv sectionContainer">

                {/* ADD-CLASS FORM */}
                <div className={activeForm1}>
                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <IoIosCloseCircle className='icon' onClick={removeForm1} />
                        <h3>Add Class</h3>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="classname">Class Name</label>
                            <div className="input flex">
                                <input type="text" id='classname' placeholder='Enter' onChange={(event) => {
                                    setClassName(event.target.value)
                                }} />
                            </div>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="instructorID">Instructor ID</label>
                            <div className="input flex">
                                <input type="text" id='instructorID' placeholder='Enter' onChange={(event) => {
                                    setInstructor(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="instructorID">Schedule ID</label>
                            <div className="input flex">
                                <input type="text" id='scheduleID' placeholder='Enter' onChange={(event) => {
                                    const ids = event.target.value.split(',').map(id => id.trim()); // Chuyển đổi chuỗi thành mảng và loại bỏ khoảng trắng
                                    setScheduleIds(ids);
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="price">Price</label>
                            <div className="input flex">
                                <input type="text" id='price' placeholder='Enter' onChange={(event) => {
                                    setPrice(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/* ADD-CLASS STATUS */}
                        <span className={statusHolder}>{addClassStatus}</span>

                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn' onClick={uploadClass}>
                            <span>Upload Class</span>
                        </button>
                    </form>
                </div>

                {/* EDIT-CLASS FORM */}
                <div className={activeForm2}>
                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <IoIosCloseCircle className='icon' onClick={removeForm2} />
                        <h3>Edit Class</h3>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="classname">Class Name</label>
                            <div className="input flex">
                                <input type="text" id='classname' placeholder='Enter' value={className} onChange={(event) => {
                                    setClassName(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="instructorID">Instructor ID</label>
                            <div className="input flex">
                                <input type="text" id='instructorID' placeholder='Enter' value={instructorID} onChange={(event) => {
                                    setInstructor(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="instructorID">Schedule ID</label>
                            <div className="input flex">
                                <input type="text" id='scheduleID' placeholder='Enter' value={scheduleIds.join(',')} onChange={(event) => {
                                    const ids = event.target.value.split(',').map(id => id.trim()); // Chuyển đổi chuỗi thành mảng và loại bỏ khoảng trắng
                                    setScheduleIds(ids);
                                }} />
                            </div>
                        </div>

                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="price">Price</label>
                            <div className="input flex">
                                <input type="text" id='price' placeholder='Enter' value={price} onChange={(event) => {
                                    setPrice(event.target.value)
                                }} />
                            </div>
                        </div>

                        {/* EDIT-CLASS STATUS */}
                        {/* <span className={statusHolder}>{addClassStatus}</span> */}

                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn' onClick={handleEditClass}>
                            <span>Submit</span>
                        </button>
                    </form>
                </div>

                <div className="tableDiv flex">
                    <h2>Class List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Class ID</th>
                                <th>Class Name</th>
                                <th>Instructor ID</th>
                                <th>Instructor</th>
                                <th>Schedule</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem) => (
                                <tr key={classItem.id}>
                                    <td>{classItem.id}</td>
                                    <td>{classItem.class_name}</td>
                                    <td>{classItem.instructor_id}</td>
                                    <td>{classItem.instructor_detail.username}</td>
                                    <td>
                                        {classItem.schedules.map((schedule) => (
                                            <span key={schedule.id}>
                                                <span> {schedule.day_of_the_week_value} from {schedule.start_time} to {schedule.end_time} </span>
                                                <br />
                                            </span>
                                        ))}
                                    </td>
                                    <td>{classItem.price}</td>
                                    <td>
                                        <BsFillTrashFill className='icon' onClick={() => handleDeleteClass(classItem.id)} />
                                        <BsFillPencilFill className='icon' onClick={() => showForm2(classItem)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn" onClick={showForm1}>Add Class</button>
                </div>

                <div className={blur}>
                </div>
            </div>

            {/* SCHEDULE LISTING SECTION */}
            <div className="classScheduleDiv sectionContainer">

                {/* ADD-SCHEDULE FORM */}
                <div className={activeForm3}>
                    <form action="" className="form grid" onSubmit={onSubmit}>
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
                        <span className={statusHolder}>{addClassStatus}</span>

                        {/* SUBMIT BUTTON */}
                        <button type='submit' className='btn' onClick={uploadSchedule}>
                            <span>Upload Schedule</span>
                        </button>
                    </form>
                </div>

                <div className="tableDiv flex">
                    <h2>Schedule</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Schedule ID</th>
                                <th>Class ID</th>
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
                                    <td>{scheduleItem.class_id}</td>
                                    <td>{scheduleItem.day_of_the_week_value}</td>
                                    <td>{scheduleItem.start_time}</td>
                                    <td>{scheduleItem.end_time}</td>
                                    <td>
                                        <BsFillTrashFill className='icon' onClick={() => handleDeleteClass(classItem.id)} />
                                        <BsFillPencilFill className='icon' onClick={showForm3} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn" onClick={showForm3}>Add Schedule</button>
                </div>

            </div>
        </div>
    )
}

export default ClassManager
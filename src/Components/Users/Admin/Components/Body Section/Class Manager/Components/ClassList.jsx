import React, { useEffect, useState } from 'react'
import Axios from '../../../../../../../axiosConfig';

//IMPORTED ICON ================>
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

const ClassList = () => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';
    //ADD-CLASS API
    const [className, setClassName] = useState('')
    const [instructorID, setInstructor] = useState('')
    const [price, setPrice] = useState('')
    const [roomID, setRoomID] = useState('')
    const [lesson, setLesson] = useState('')
    const [classImage, setClassImage] = useState(null)

    //Show the form when  Add-Class-button clicked =================>
    const [activeForm1, setActiveForm1] = useState('formDiv flex')
    const [blur, setBlur] = useState('blurLayer')
    const showForm1 = () => {
        setActiveForm1('formDiv flex showForm')
        setBlur('blurLayer showLayer')
    }
    const removeForm1 = () => {
        setActiveForm1('formDiv flex')
        setBlur('blurLayer')
    }

    // Add-Class Status in the form ===========================>
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


    // Add-Class Form Submit ===========================>
    const uploadClass = async (e) => {
        e.preventDefault();
        Axios.post('/add_class/', {
            class_name: className,
            instructor_id: instructorID,
            price: price,
            schedules_ids: scheduleIds,
            room_id: roomID,
            class_lesson: lesson

        }).then((response) => {
            if (response.data.message === "Success") {
                setAddClassStatus(response.data.message)
                fetchClasses()
            }
        }).catch((error) => {
            if (error.response) {
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

    //Delete  =======>
    const handleDeleteClass = (classId) => {
        Axios.delete(`/class/${classId}/`)
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

    //Edit  =======>
    const handleEditClass = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('class_name', className);
        formData.append('instructor_id', instructorID);
        formData.append('price', price);
        formData.append('room_id', roomID);
        formData.append('class_lesson', lesson);
        if (classImage) {
            formData.append('image', classImage);
        }
        scheduleIds.forEach(id => {
            formData.append('schedules_ids', id);
        });

        console.log("FORM DATA:", formData, "lox")
        console.log("schedule string:", JSON.stringify(scheduleIds))

        // Axios.patch(`/class/${classId}/`, {
        //     class_name: className,
        //     instructor_id: instructorID,
        //     price: price,
        //     schedules_ids: scheduleIds,
        //     room_id: roomID,
        //     class_lesson: lesson,
        //     image: classImage
        // })
        //     .then((response) => {
        //         alert("Thông tin lớp học đã được cập nhật.");
        //         fetchClasses();
        //         removeForm2();
        //     })
        //     .catch((error) => {
        //         console.error("Có lỗi: ", error);
        //         alert("Có lỗi xảy ra khi cập nhật thông tin lớp học.");
        //     });

        // Serialize schedules_ids array into a string format
        scheduleIds.forEach((id, index) => {
            formData.append(`schedules_ids[${index}]`, id);
        });
        Axios.patch(`/class/${classId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                alert("Thông tin lớp học đã được cập nhật.");
                fetchClasses();
                removeForm2();
                console.log("Schedules:", scheduleIds);
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
        setRoomID(classData.room_id)
        setLesson(classData.class_lesson)
        setClassImage(classData.image)
        setClassImage(null)
        const IDs = classData.schedules.map(schedule => schedule.id);
        setScheduleIds(IDs)

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

    //LISTING-CLASSES API===================================================================>
    const [classes, setClasses] = useState([]); // State hold the list of classes
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        Axios.get('/class-list/')
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>
            {/* CLASS SECTION */}
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
                            <label htmlFor="classname">Lesson</label>
                            <div className="input flex">
                                <input type="text" id='lesson' placeholder='Enter' onChange={(event) => {
                                    setLesson(event.target.value)
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
                            <label htmlFor="roomID">Room ID</label>
                            <div className="input flex">
                                <input type="text" id='roomID' placeholder='Enter' onChange={(event) => {
                                    setRoomID(event.target.value)
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
                            <label htmlFor="classname">Class Image</label>
                            <div className="input flex">
                                <input type="file" id='classImage' placeholder='' onChange={(event) => {
                                    setClassImage(event.target.files[0])
                                }} />
                            </div>
                        </div>


                        {/*  INPUT */}
                        <div className="inputDiv">
                            <label htmlFor="classname">Lesson</label>
                            <div className="input flex">
                                <input type="text" id='lesson' placeholder='Enter' value={lesson} onChange={(event) => {
                                    setLesson(event.target.value)
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
                            <label htmlFor="roomID">Room ID</label>
                            <div className="input flex">
                                <input type="text" id='roomID' placeholder='Enter' value={roomID} onChange={(event) => {
                                    setRoomID(event.target.value)
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
                                <th>Class Img</th>
                                <th>Class's Lesson</th>
                                <th>Room</th>
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
                                    <td>
                                        {classItem.image && (
                                            <img
                                                src={`${cloudinaryBaseUrl}/${classItem.image}`}
                                                alt="Class Image"
                                                style={{ width: '100px', height: 'auto' }} />
                                        )}
                                    </td>
                                    <td>{classItem.class_lesson}</td>
                                    <td>{classItem.room_id}</td>
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

                <div className={blur}></div>
            </div>
        </div>
    )
}

export default ClassList
import React from 'react'
import StudentList from './Components/StudentList'
import StudentAttendance from './Components/StudentAttendance'

const Students = () => {
    return (
        <div>
            <StudentAttendance />
            <StudentList />
        </div>
    )
}

export default Students
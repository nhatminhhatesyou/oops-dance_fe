import React from 'react'
import StudentList from './Components/StudentList'
import StudentAttendance from './Components/StudentAttendance'

const Students = () => {
    return (
        <div>
            <StudentList />
            <StudentAttendance />
        </div>
    )
}

export default Students
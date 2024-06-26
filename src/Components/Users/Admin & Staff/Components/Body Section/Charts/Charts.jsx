import React from 'react'
import BookingChart from './Components/BookingChart'
import ClassChart from './Components/ClassChart'

const Charts = () => {
    return (
        <div className='flex flex-col gap-4'>
            <BookingChart />
            <ClassChart />
        </div>
    )
}

export default Charts
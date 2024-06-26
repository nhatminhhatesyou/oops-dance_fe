import './ClassManager.css'

//IMPORTED ICON ================>
import ClassList from './Components/Classes/ClassList';
import Schedule from './Components/Schedules/Schedule';

const ClassManager = () => {
    return (
        <div className='classManager'>
            <ClassList />
            <Schedule />
        </div>
    )
}

export default ClassManager
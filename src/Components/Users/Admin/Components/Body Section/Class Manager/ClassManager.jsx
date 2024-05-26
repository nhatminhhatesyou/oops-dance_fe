import './ClassManager.css'

//IMPORTED ICON ================>
import ClassList from './Components/ClassList';
import Schedule from './Components/Schedule';



const ClassManager = () => {
    return (
        <div className='classManager'>
            <ClassList />
            <Schedule />
        </div>
    )
}

export default ClassManager
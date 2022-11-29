import { useState } from 'react'
import Homepage from './components/Homepage'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp';
import CourseSelect from './components/CourseSelect';


function App() {

    // const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState('Homepage');


    return(
        <>
            {page === 'Homepage' && <Homepage handleClick={setPage}/>}
            {page === 'LogIn' && <LogIn/>}
            {page === 'SignUp' && <SignUp/>}
            {page === 'CourseSelect' && <CourseSelect/>}
        </>
    )
};

export default App
import { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from './components/Homepage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import CourseSelect from './components/CourseSelect';




function App() {

    const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState('Homepage');

    const url = 'https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/courses/';


    useEffect(() => {
        async function getData() {
            const resp = await axios.get(url);
            setData(resp.data);
        }
        getData();
    }, []);


    return(
        <>
            {page === 'Homepage' && <Homepage handleClick={setPage}/>}
            {page === 'LogIn' && <LogIn/>}
            {page === 'SignUp' && <SignUp/>}
            {page === 'CourseSelect' && <CourseSelect courses={data} setCourses={setData} />}
        </>
    )
};

export default App
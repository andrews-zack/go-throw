import { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from './components/Homepage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import CourseSelect from './components/CourseSelect';
import Hole from './components/Hole';
import { GlobalProvider, useGlobalState } from './context/GlobalState'
import Profile from './components/Profile';




function App() {

    const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState('Homepage');
    const [ state, dispatch ] = useGlobalState();

    const url = 'https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/courses/';

    let id = ''

    if (state.currentUser) {
        id = state.currentUser.user_id
    } else {

    }

    useEffect(() => {
        async function getData() {
            const resp = await axios.get(url);
            setData(resp.data);
        }
        getData();
    }, []);


    return(
        <GlobalProvider>
            {page === 'Homepage' && <Homepage handleClick={setPage}/>}
            {page === 'LogIn' && <LogIn handleClick={setPage}/>}
            {page === 'SignUp' && <SignUp handleClick={setPage}/>}
            {page === 'CourseSelect' && <CourseSelect courses={data} setCourses={setData} handleClick={setPage} />}
            {page === 'Hole' && <Hole holes={data}/>}
            {page === 'Profile' && <Profile id={id}/>}
        </GlobalProvider>
    )
};

export default App
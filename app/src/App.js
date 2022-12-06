import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import CourseSelect from './components/CourseSelect';
import Hole from './components/Hole';
import { GlobalProvider, useGlobalState } from './context/GlobalState'
import Profile from './components/Profile';




function App() {

    const [ users, setUsers ] = useState([]);
    const [ state, dispatch ] = useGlobalState();
    const [ selectedCourse, setSelectedCourse ] = useState({})

    // const url = 'https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/users/';

    let id = ''

    if (state.currentUser) {
        id = state.currentUser.user_id
    }

    useEffect(() => {
        axios.get(`https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/users/${id}`)
            .then((resp) => setUsers(resp.data));
        }, [])


    return(
        <>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/login" element={<LogIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/courses" element={<CourseSelect selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}/>}/>
                <Route path="/profile" element={<Profile users={users}/>}/>
                <Route path="/hole" element={<Hole holes={selectedCourse} users={users}/>}/>
            </Routes>
            {/* {page === 'Homepage' && <Homepage handleClick={setPage}/>}
            {page === 'LogIn' && <LogIn handleClick={setPage}/>}
            {page === 'SignUp' && <SignUp handleClick={setPage}/>}
            {page === 'CourseSelect' && <CourseSelect courses={data} setCourses={setData} handleClick={setPage} />}
            {page === 'Hole' && <Hole holes={data}/>}
            {page === 'Profile' && <Profile id={id}/>} */}
        </>
    )
};

export default App
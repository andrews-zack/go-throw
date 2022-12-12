import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import CourseSelect from './components/CourseSelect';
import Hole from './components/Hole';
import { useGlobalState } from './context/GlobalState'
import Profile from './components/Profile';
import request from './services/api.request';
import { API_URL } from './services/auth.constants';
import Scorecard from './components/Scorecard';


function App() {

    const [users, setUsers] = useState([]);
    const [state, dispatch] = useGlobalState();
    const [selectedCourse, setSelectedCourse] = useState({})
    const [rnd, setRnd] = useState(0);


    let id = ''

    if (state.currentUser) {
        id = state.currentUser.user_id
    } else {
        id = 11
    }

    useEffect(() => {
        request({
            url: `users/${id}`,
            method: "GET",
        }).then((resp) => setUsers(resp.data));
        axios.get(`${API_URL}users/${id}`)
    }, [])

    const postRound = async (name) => {
        const roundData = {
            "user": id,
            "course": name,
        }
        return await axios.post(`${API_URL}rounds/`, roundData).then((resp) => {
            console.log(resp.status);
            console.log(resp.data)
            setRnd(resp.data.id)
        })
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/courses" element={
                    <CourseSelect
                        setSelectedCourse={setSelectedCourse}
                        postRound={postRound}
                    />
                } />
                <Route path="/profile" element={<Profile users={users} rnd={rnd} />} />
                <Route path="/hole" element={<Hole holes={selectedCourse} users={users} rnd={rnd} id={id}/>} />
                <Route path='/scorecard' element={<Scorecard data={selectedCourse} rnd={rnd} users={users} id={id}/>} />
            </Routes>
        </>
    )
};

export default App
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


function App() {

    const [users, setUsers] = useState([]);
    const [state, dispatch] = useGlobalState();
    const [selectedCourse, setSelectedCourse] = useState({})
    const [rnd, setRnd] = useState(0);

    // const url = 'https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/users/';

    let id = ''

    if (state.currentUser) {
        id = state.currentUser.user_id
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
            "user": state.currentUser.user_id,
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
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                        setRnd={setRnd}
                        postRound={postRound}
                    />
                } />
                <Route path="/profile" element={<Profile users={users} />} />
                <Route path="/hole" element={<Hole holes={selectedCourse} users={users} rnd={rnd} />} />
            </Routes>
        </>
    )
};

export default App
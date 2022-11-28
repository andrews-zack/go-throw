import { useState } from 'react'
import Homepage from './components/Homepage'
import LogIn from './components/LogIn'


function App() {

    // const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState('Home');


    return(
        <div>
            <Homepage handleClick={setPage}/>
            {page === 'LogIn' && <LogIn />}
        </div>
    )
};

export default App
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const [ data, setData ] = useState([]);

const url = 'https://8000-andrewszack-gothrowdb-rxyuwddajv2.ws-us77.gitpod.io/api/holes/';


useEffect(() => {
    async function getData() {
        const resp = await axios.get(url);
        setData(resp.data);
    }
    getData();
}, []);


const ref = React.useRef(null);
const [map, setMap] = React.useState();

React.useEffect(() => {
    if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
    }
}, [ref, map]);

export default MapTest
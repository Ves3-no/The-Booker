import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { useLocation } from 'react-router-dom'
import Nav from '../comps/Nav'


export default function main(){
    const {Products, setLocation} = useAppContext()
    const { id } = useParams();
    const location = useLocation()
    setLocation(location.pathname)
    return(<>
    <Nav/>
    </>)
}
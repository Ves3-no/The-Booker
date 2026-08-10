import { useEffect } from "react"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { useParams, Link } from "react-router-dom"
type pages = "Home" | "Bookings"| "ProductBookings" | "Custumers" | "Workers"| "WorkerCalendar" | "Admins" | "Products"| "Services"
import Admins from '../comps/AdminAdmins'
import Bookings from '../comps/AdminBookings'
import Custumers from '../comps/AdminCustumers'
import Home from '../comps/AdminHome'
import ProductBookings from '../comps/AdminProductBookings'
import Products from '../comps/AdminProducts'
import Services from '../comps/AdminServices'
import WorkerCalendar from '../comps/AdminWorkerCalendar'
import Workers from '../comps/AdminWorkers'

export default function main(){
    const { page } = useParams();
    const thepage = page as pages
    const navigate = useNavigate()
    const { IsAdmin, IsWorker } = useAppContext()
    useEffect(()=>{
        if(IsAdmin == false && IsWorker == false){
            navigate('/auth')
        }
    }, [])
    const PageElements = {
        "Admins": <Admins/>,
        "Bookings": <Bookings/>,
        "Custumers": <Custumers/>,
        "Home": <Home/>,
        "ProductBookings": <ProductBookings/>,
        "Products": <Products/>,
        "Services": <Services/>,
        "WorkerCalendar": <WorkerCalendar/>,
        "Workers": <Workers/>
    }
    return(<>
        <div className="flex flex-row h-screen">
            <div className="flex-2 min-w-70 flex flex-col items-start gap-2 bg-bg-surface h-full p-5 max-w-80">
                <div className="flex flex-col items-start gap-2 h-full w-full">
                    <Link to="/" className='text-text-primary text-3xl font-extrabold mb-2 hover:underline transition-all'>Ves3</Link>

                    <span className="h-px w-full bg-text-secondary mb-2"></span>

                    <Link to={"/Admin/Home"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Home" ? "underline" : "none"}}>Home</Link>
                    <Link to={"/Admin/Bookings"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Bookings" ? "underline" : "none"}}>Bookings</Link>
                    <Link to={"/Admin/ProductBookings"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "ProductBookings" ? "underline" : "none"}}>ProductBookings</Link>
                    <Link to={"/Admin/Custumers"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Custumers" ? "underline" : "none"}}>Custumers</Link>
                    <Link to={"/Admin/Workers"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Workers" ? "underline" : "none"}}>Workers</Link>
                    <Link to={"/Admin/WorkerCalendar"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "WorkerCalendar" ? "underline" : "none"}}>WorkerCalendar</Link>
                    <Link to={"/Admin/Admins"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Admins" ? "underline" : "none"}}>Admins</Link>
                    <Link to={"/Admin/Products"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Products" ? "underline" : "none"}}>Products</Link>
                    <Link to={"/Admin/Services"} className="italic text-lg hover:scale-110 transition-all" style={{textDecoration: thepage === "Services" ? "underline" : "none"}}>Services</Link>
                </div>
                <p className="text-sm text-text-secondary text-center w-full">Delivered buy <a href="https://ves3.no/" className="text-primary hover:underline">Ves3.no</a></p>
            </div>
            <div className="flex-9">
                {PageElements[thepage]}
            </div>
        </div>
    </>)
}
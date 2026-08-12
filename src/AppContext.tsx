import { createContext, useContext, useEffect, useState, type PropsWithChildren, type Dispatch, type SetStateAction } from 'react';
import { supabase } from './supabase';
import { type Product, type Service, type Worker, type worker_services, type Worker_calendar, type User, type Booking, type Custumer } from './types';
import CompanyId from './CompanyId';

type typeappcontext = {
    Products: Product[] | undefined;
    Services: Service[] | undefined;
    Workers: Worker[] | undefined;
    Worker_calendars: Worker_calendar[] | undefined;
    Worker_Services: worker_services[] | undefined;
    User: User | undefined;
    IsWorker: boolean;
    IsAdmin: boolean;
    setIsWorker: Dispatch<SetStateAction<boolean>>;
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
    location: string;
    setLocation: Dispatch<SetStateAction<string>>;
    Bookings: Booking[] | undefined;
    setBookings: Dispatch<SetStateAction<Booking[] | undefined>>;
    Custumers: Custumer[] | undefined;
}

const AppContext = createContext<typeappcontext | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
    const [Products, setProducts] = useState<Product[] | undefined>()
    const [Services, setServices] = useState<Service[] | undefined>()
    const [Workers, setWorkers] = useState<Worker[] | undefined>()
    const [Worker_calendars, setWorker_calendars] = useState<Worker_calendar[] | undefined>()
    const [Worker_Services, setWorker_Services] = useState<worker_services[] | undefined>()
    const [User, setUser] = useState<User | undefined>()
    const [location, setLocation] = useState<string>("")
    const [IsWorker, setIsWorker] = useState<boolean>(false)
    const [IsAdmin, setIsAdmin] = useState<boolean>(false)
    const [Bookings, setBookings] = useState<Booking[] | undefined>()
    const [Custumers, setCustumers] = useState<Custumer[] | undefined>()


    useEffect(() =>{
        async function getProducts(){
            const { data, error } = await supabase
                .from('Products')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            const res = data as Product[]
            setProducts(res)
        }
        async function getServices() {
            const { data, error } = await supabase
                .from('Services')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            const res = data as Service[]
            setServices(res)
        }
        async function getWorkers() {
            const { data, error } = await supabase
                .from('Workers')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            const res = data as Worker[]
            setWorkers(res)
        }
        async function getWorker_Calendars() {
            const { data, error } = await supabase
                .from('worker_calendar')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            const res = data as Worker_calendar[]
            setWorker_calendars(res)
        }
        async function getWorker_Services() {
            const { data, error } = await supabase
                .from('worker_services')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            const res = data as worker_services[]
            setWorker_Services(res)
        }
        async function GetUser() {
            const { data: { user }, error } = await supabase.auth.getUser()
            if(error){
                console.log(error.message)
                return
            }
            setUser(user as User)
        }
        getProducts()
        getWorkers()
        getServices()
        getWorker_Calendars()
        getWorker_Services()
        GetUser()
    }, [])
    useEffect(()=>{
        if(IsAdmin || IsWorker){
            async function getBookings(){
                const { data, error } = await supabase
                    .from('custumers')
                    .select()
                    .eq('company_id', CompanyId)
                if(error){
                    console.log(error)
                    return
                }
                setBookings(data)
            }
            async function getCustumers(){
                const { data, error } = await supabase
                    .from('bookings')
                    .select()
                    .eq('company_id', CompanyId)
                if(error){
                    console.log(error)
                    return
                }
                setCustumers(data)
            }
            getBookings()
            getCustumers()
        }
    }, [])
    return (
        <AppContext.Provider value={{Products, Services, Workers, Worker_calendars, Worker_Services, User, IsWorker, IsAdmin, setIsWorker, setIsAdmin, location, setLocation, Bookings, setBookings, Custumers}}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context){
        throw new Error('useAppContext må brukes innenfor en AppProvider')
    }
    return(context)
} ;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Service } from '../types';
import { useAppContext } from '../AppContext';
import type { Worker } from '../types.ts';
import Nav from '../comps/Nav'
import { useLocation } from 'react-router-dom'

export default function main(){
    const {Services, Worker_Services, Workers, setLocation} = useAppContext()
    const { id } = useParams();
    const [service, setService] = useState<Service>()
    const [thisWorkers, setThisWorkers] = useState<Worker[]>()
    const location = useLocation()
    setLocation(location.pathname)
    useEffect(()=>{
        Services?.map((Ser: Service)=> {
            if(Ser.id == id){
                setService(Ser)
                return
            }
        })  
        const matchingWorkers: Worker[] | undefined = Workers?.filter((worker)=>{
            return Worker_Services?.some((service) => service.worker_id === worker.id && service.service_id === id)
        }) 
        setThisWorkers(matchingWorkers)
    }, [Services])
    return(<>
    <Nav/>
    <div className='text-text-secondary flex flex-row p-10 font-main'>
        <img src={service?.Image} alt="" className='flex-4 rounded-2xl'/>
        <div className='flex-5'>
            <div className='flex flex-col items-start p-5 px-10 gap-3'>
                <h1 className='text-4xl font-bold text-text-primary'>{service?.name}</h1>
                <p className='text-text-primary text-lg'>Estimated Price <span className="text-primary font-bold">{service?.price}</span> kr</p>
                <div className='text-left mt-5 mb-2'>
                    <p className=' text-text-primary'>Description:</p>
                    <p className='text-left'>{service?.description}</p>
                </div>
                <button className='p-2 rounded-xl bg-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl'>Book now</button>
            </div>
            <div>
                <h2 className='text-xl text-text-primary'>Workers</h2>
                <p className='text-sm'>The people that deliver this to you</p>
                <div className='flex flex-col justify-center px-10 items-center py-2'>
                    {thisWorkers?.map((worker: Worker, index)=>{
                        return(<div key={index} className='flex flex-col w-full border border-text-primary p-2 rounded-md justify-center items-center gap-2'>
                            <h3 className='text-lg text-text-primary border-b border-text-secondary px-4'>{worker.name}</h3>
                            <p className=''>{worker.auto_accept == true ? "When you book a time slot with this team member, your meeting is instantly confirmed. You will receive a calendar invite and a meeting link right away, so we can jump straight into discussing your project at your chosen time.": "After you submit your request, this team member will review their schedule and confirm your meeting shortly. You will receive a confirmation email with all the meeting details as soon as the request is accepted."}</p>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    </div>
    </>)
}
import { useAppContext } from "../AppContext"
import AdminBookingsInTable from './AdminBookingsInTable'
export default function main(){
    const {Custumers, Bookings, Workers, Services} = useAppContext()
    return(<>
        <div className="flex flex-col p-5 w-full gap-8 font-main text-text-primary">
            <h1 className="text-primary font-bold text-3xl">Custumers</h1>
            <div className="overflow-hidden rounded-xl border border-text-secondary shadow-sm">
                <table className="w-full p-3 ">
                    <thead>
                        <tr >
                            <th className="border-r border-text-secondary">Service</th>
                            <th className="border-x border-text-secondary">Custumer name</th>
                            <th className="border-x border-text-secondary">Email</th>
                            <th className="border-x border-text-secondary">date</th>
                            <th className="border-x border-text-secondary">Starting time</th>
                            <th className="border-x border-text-secondary">Endig time</th>
                            <th className="border-x border-text-secondary">Status</th>
                            <th className="border-x border-text-secondary">Worker name</th>
                            <th className="border-l border-text-secondary">Booking Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Bookings?.map((Booking, index)=>{
                            return(<AdminBookingsInTable Booking={Booking} index={index} Custumers={Custumers} Workers={Workers} Services={Services}/>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}
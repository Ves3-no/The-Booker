import type { Booking, Custumer, Worker, Service } from "../types";

export default function app({Booking, index, Custumers, Workers, Services}: {Booking: Booking, index: number, Custumers: Custumer[] | undefined, Workers: Worker[] | undefined, Services: Service[] | undefined}){
    const Custumer: Custumer | undefined = Custumers?.find((custumer) => custumer.custumer_id === Booking.customer_id)
    const Worker: Worker | undefined = Workers?.find((worker)=> worker.id === Booking.worker_id)
    const Service: Service | undefined = Services?.find((service)=> service.id === Booking.service_id)
    return(
        <tr key={index} className="border-t border-text-secondary">
            <th className="border-r border-text-secondary">{Service?.name}</th>
            <th className="border-x border-text-secondary">{Custumer?.name}</th>
            <th className="border-x border-text-secondary">{Custumer?.mail}</th>
            <th className="border-x border-text-secondary">{Booking.date}</th>
            <th className="border-x border-text-secondary">{Booking.start_time}</th>
            <th className="border-x border-text-secondary">{Booking.end_time}</th>
            <th className="border-x border-text-secondary">{Booking.status}</th>
            <th className="border-x border-text-secondary">{Worker?.name}</th>
            <th className="border-l border-text-secondary">{Booking.created_at}</th>
        </tr>
        )
}
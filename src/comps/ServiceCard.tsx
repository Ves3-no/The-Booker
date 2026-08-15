import { Link } from "react-router-dom";
import type { Service } from "../types";

export default function main({service}: {service: Service}){
    return(<>
    <div className="w-80 p-6 border-[0.5px] border-text-primary flex flex-col items-center rounded-2xl hover:shadow-2xl transition-all hover:bg-primary/10">
        <img src={service.Image} alt="" className="h-60 w-70 object-cover rounded-xl"/>
        <h1 className="text-text-primary font-bold text-lg mt-5">{service.name}</h1>
        <p>Estimated Price <span className="text-text-primary font-semibold">{service.price}</span> kr</p>
        <Link className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl mt-3' to={`/Service/${service.id}`}>Read More</Link>
    </div>

    </>)
}
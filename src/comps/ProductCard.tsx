import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function main({product}: {product: Product}){
    return(<>
        <div className="w-80 p-6 border-[0.5px] border-text-primary flex flex-col items-center rounded-sm hover:shadow-2xl transition-all">
        <img src={product.Image} alt="" className="h-60 w-70 object-cover rounded-xl"/>
        <h1 className="text-text-primary font-bold text-lg mt-5">{product.name}</h1>
        <p>Price: <span className="text-text-primary font-semibold">{product.price}</span> kr</p>
        <Link className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl mt-3' to={`/Product/${product.id}`}>Buy now</Link>
        </div>
    </>)
}
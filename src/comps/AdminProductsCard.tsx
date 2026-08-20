import { useState } from "react";
import type { Product } from "../types";

export default function main({prod, index}: {prod: Product, index: number}){
    const [Name, setName] = useState<string>(prod.name)
    const [Image, setImage] = useState<string>(prod.Image)
    const [Price, setPrice] = useState<number>(prod.price)
    const [Description, setDescription] = useState<string>(prod.description)
    const [Stock, setStock] = useState<number>(prod.stock)
    return(<>
    <div key={index}>
            <h3><input type="text" value={Name} onChange={(e)=> {setName(e.currentTarget.value)}}/></h3>
            <button><img src={Image} alt="" /></button>
            <p><input type="text" value={Description} onChange={(e)=> {setDescription(e.currentTarget.value)}}/></p>
            <p><input type="text" value={Price} onChange={(e)=> {setPrice(Number(e.currentTarget.value))}}/></p>
            <p><input type="text" value={Stock} onChange={(e)=> {setStock(Number(e.currentTarget.value))}}/></p>
            <button>Deleate</button>
    </div>

    </>)
}
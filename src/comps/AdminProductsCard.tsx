import { useState } from "react";
import type { Product } from "../types";

export default function main({prod, index}: {prod: Product, index: number}){
    const [Name, setName] = useState<string>()
    const [Image, setImage] = useState<string>()
    const [Price, setPrice] = useState<number>()
    const [Description, setDescription] = useState<string>()
    const [Stock, setStock] = useState<number>()
    return(<>
    <div key={index}>
            <h3><input type="text" /></h3>
            <button><img src="" alt="" /></button>
            <p><input type="text" /></p>
            <p><input type="text" /></p>
            <p><input type="text" /></p>
            <button>Deleate</button>
    </div>

    </>)
}
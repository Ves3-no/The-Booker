import { useAppContext } from "../AppContext"
import Cards from "./AdminProductsCard.tsx"
export default function main(){
    const { Products } = useAppContext()
    return(<>
        <div>
            <h1>Products</h1>
            <div>
                {Products?.map((prod, index)=> {
                    return <Cards prod={prod} index={index}/>
                })}
            </div>
        </div>
    </>)
}
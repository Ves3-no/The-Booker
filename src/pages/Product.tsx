import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { useLocation } from 'react-router-dom'
import Nav from '../comps/Nav'
import { useEffect, useState } from 'react';
import type { Product } from '../types';


export default function main(){
    const {Products, setLocation} = useAppContext()
    const { id } = useParams();
    const [product, setProduct] = useState<Product | undefined>()
    const location = useLocation()
    setLocation(location.pathname)
    useEffect(()=>{
        Products?.map((Pro: Product)=> {
            if(Pro.id == id){
                setProduct(Pro)
                return
            }
        })  
    }, [])
    return(<>
    <Nav/>
    <div className='text-text-secondary flex flex-row p-10 font-main'>
            <img src={product?.Image} alt="" className='flex-4 rounded-2xl max-h-150'/>
            <div className='flex-5'>
                <div className='flex flex-col items-start p-5 px-10 gap-3'>
                    <h1 className='text-4xl font-bold text-text-primary'>{product?.name}</h1>
                    <p className='text-text-primary text-lg'>Price: <span className="text-primary font-bold">{product?.price}</span> kr</p>
                    <button className='p-2 rounded-xl bg-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl'>Reserve</button>
                    <div className='text-left mt-5 mb-2'>
                        <p className=' text-text-primary'>Description:</p>
                        <p className='text-left'>{product?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
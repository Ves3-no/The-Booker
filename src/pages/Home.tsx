import Image from '../Assets/photo-1531973576160-7125cd663d86.avif'
import Image2 from '../Assets/pexels-cottonbro-6804068.jpg'
import { useAppContext } from '../AppContext'
import ServiceCard from '../comps/ServiceCard'
import Nav from '../comps/Nav'
import ProductCard from '../comps/ProductCard'
import type { Product, Service } from '../types'
import { useLocation } from 'react-router-dom'
export default function main(){
    const location = useLocation()
    const {Services, Products, setLocation} = useAppContext()
    setLocation(location.pathname)
    return(<>
        <Nav/>
        <div className='font-main text-text-secondary bg-bg-main flex flex-col gap-10'>
            <div id="hearo" className='flex w-full h-150'> 
                <img src={Image2} alt="" className='w-600 object-cover' />
                <div className=" bg-bg-main [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)] w-full -ml-70 flex items-center justify-center p-10 flex-col gap-5">
                    <h1 className='text-5xl font-bold font-main text-primary'>Ves3 Test Store</h1>
                    <p className='-mt-4'>-Furture of Devs-</p>
                    <div className='flex gap-5'>
                        <a className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' href='#services'>Services</a>
                        <a className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' href='#products'>Products</a>
                    </div>
                </div>
            </div>
            <div id="about" className='w-full flex h-130 flex-row overflow-hidden justify-center items-center'>
                <div className='w-150 my-10 gap-10 flex flex-col px-10 items-center'>
                    <h1 className='text-text-primary text-2xl font-bold'>About Us</h1>
                    <p className='text-text-primary'>We are a <span className="text-primary">locally driven business</span> that genuinely cares about our <span className="text-primary">customers</span> and the community we serve. Founded in 2026, our company was built on a foundation of <span className="text-primary">quality, integrity, and exceptional service</span>. We offer a wide variety of tailored products and services designed to meet your specific needs, and we are committed to building <span className="text-primary">long-lasting relationships</span> based on trust and reliability.</p>                        
                    <div className='flex gap-5'> 
                            <a className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' href='#products'>See our offers</a>
                            <a className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' href='/about'>Read more</a>
                        </div>
                </div>
                <img src={Image} alt="" className='w-170 object-cover rounded-2xl'/>
            </div>
            <div id="services" className='scroll-m-25'>
                <h1 className='text-3xl font-bold text-primary'>Services</h1>
                <p>This is the things our employees specialise in everyday</p>
                <div id='service_list' className='flex flex-row flex-wrap justify-center items-center px-15 py-10 gap-10'>
                    {Services?.map((service: Service, index: number) =>{
                        return(<ServiceCard key={index} service={service}/>)
                    })} 
                </div>
            </div>
            <div id='contact' className='flex justify-center items-center py-4 flex-col gap-10'>
                    <span className='w-full h-px bg-text-secondary'></span> 
                    <div className='flex w-150 flex-col gap-3 justify-center items-center'>
                        <h1 className='font-bold text-text-primary text-4xl'>Contact</h1>
                        <p>As stated, we care about our customers, which is why we offer dedicated customer service. Contact us below, and we will answer you as fast as possible. Our team is always ready to assist you with any questions or support you might need. Or write directly to <span className='text-primary'>hei@ves3.no</span></p>
                        <a href="mailto:hei@ves3.no" className='p-2 rounded-xl bg-text-primary text-bg-main w-50 text-md hover:rounded-xs transition-all hover:shadow-2xl'>Contact us on mail</a>
                    </div>
                    <span className='w-full h-px bg-text-secondary'></span> 
            </div>
            <div id="products" className='scroll-m-25'>
                <h1 className='text-3xl font-bold text-primary'>Our collection</h1>
                <p>YES, we do offer some products too</p>
                <div id="product_list" className='flex flex-row flex-wrap justify-center items-center px-15 py-10 gap-10'>
                    {Products?.map((product: Product, index: number) =>{
                        return(<ProductCard key={index} product={product}/>)
                    })} 
                </div>
            </div>
        </div>
    </>)
}
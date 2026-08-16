import { Link } from "react-router-dom"
export default function app(){
    return(
        <footer className='flex flex-col py-2 font-main text-text-secondary bg-bg-surface'>
            <div className='flex flex-row px-20 py-5 justify-center gap-40'>
                <div>
                <h3 className='text-primary font-bold mb-0.5 text-2xl'>Ves3 Test Store</h3>
                <p className='text-text-secondary'>-Future of Devs-</p>
                </div>

                <div className="text-start">
                <h4 className='text-md text-text-primary'>Navigation</h4>
                <ul>
                    <li><Link to="/" className='-skew-x-8 inline-block hover:underline'>Home</Link></li>
                    <li><Link to="/Login" className='-skew-x-8 inline-block hover:underline'>Login</Link></li>
                    <li><Link to="/Admin" className='-skew-x-8 inline-block hover:underline'>Admin DB</Link></li>
                </ul>
                </div>

                <div className="text-start">
                <h4 className='text-md text-text-primary'>Contact</h4>
                <p className="mb-2">Email: <a href="mailto:hei@ves3.no" className='text-primary hover:underline inline-block -skew-x-8'>hei@ves3.no</a></p>
                <p className="text-text-primary">Ves3 Test Store</p>
                <p>Eidsvågveien 42, 3. etasje</p>
                <p>5059 Bergen</p>
                <p>Org.nr: 987 654 321 MVA</p>
                </div>
            </div>

            <div>
                <p>&copy; {new Date().getFullYear()} Ves3 Test Store. All rights reserved.</p>
            </div>
        </footer>
    )
}
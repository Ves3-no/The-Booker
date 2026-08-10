import { useState } from "react"
import { supabase } from "../supabase"
import CompanyId from "../CompanyId"
import { useNavigate, useParams } from "react-router-dom"

export default function main(){
    const [mail, setMail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [name, setName] = useState<string>()
    const navigate = useNavigate()
    const { "*": location } = useParams();
    async function Login() {
        const { error } = await supabase.auth.signInWithPassword({
            email: mail?? "",
            password: password?? "",
        })
        if(error){
            console.log(error.message)
            Register()
            return
        }
        navigate(`/${location}`)
    }
    async function Register() {
        const { error } = await supabase.auth.signUp({
            email: mail?? "",
            password: password?? "",
            options: {
                data: {
                    company_id: CompanyId,
                    display_name: name, 
                    name: name,
                    mail: mail,
                },
            },
        })
        if(error){
            console.log(error.message)
            return
        }
        navigate(`/${location}`)
    }
    return(
    <div className="flex justify-center items-center w-full h-screen "> 
        <form action={async () => {await Login();}} className="flex flex-col border p-5 w-100 text-left rounded-md gap-3">
            <h1 className="text-3xl text-primary font-bold text-center">Login</h1>
            <p className="text-text-secondary text-center">We require users to login to book or buy something</p>
            <label htmlFor="">Name</label>
            <input type="text" required placeholder="John Doe" className="p-1 bg-bg-surface rounded-sm shadow" spellCheck="false" value={name} onChange={(e)=> setName(e.currentTarget.value)}/>
            <label htmlFor="">Mail</label>
            <input type="text" required placeholder="hello@example.com" className="p-1 bg-bg-surface rounded-sm shadow" value={mail} onChange={(e)=> setMail(e.currentTarget.value)}/>
            <label htmlFor="">Password</label>
            <input type="text" required placeholder="********" className="p-1 bg-bg-surface rounded-sm shadow" onChange={(e)=> setPassword(e.currentTarget.value)} value={password}/>
            <input type="submit" value="Login" className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl hover:bg-success m-auto '/>
            <p className="text-text-secondary text-center">Your purchases or bookings will be sendt to you on the mail you Register with</p>
        </form>
    </div>)
}
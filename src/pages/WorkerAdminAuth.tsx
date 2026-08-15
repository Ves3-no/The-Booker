import { useEffect } from "react"
import { useAppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
import CompanyId from "../CompanyId"

export default function main(){
    const navigate = useNavigate()
    const { setIsAdmin, setIsWorker, IsAdmin, IsWorker, location, setRefreshTrigger } = useAppContext()
    useEffect(()=>{
        if(IsAdmin == true && IsWorker == true){
            navigate('/Admin')
        }
        async function CheckIfAdmin(){
            const { data: isUserAdmin, error } = await supabase.rpc('is_admin_of', {
                p_company_id: CompanyId
            })
            if(error){
               console.log(error.message) 
               navigate("/")
               return
            }
            if(isUserAdmin == true){
                setIsAdmin(true)
                console.log("this user is a admin")
            } else{
                setIsAdmin(false)
            }
            CheckIfWorker()
        }
        async function CheckIfWorker() {
            const { data: isUserWorker, error } = await supabase.rpc('is_worker_of', {
                p_company_id: CompanyId
            })
            if(error){
               console.log(error.message) 
               navigate("/")
               return
            }
            if(isUserWorker == true){
                setIsWorker(true)
                console.log("this user is a worker")
                setRefreshTrigger(prev => prev + 1);
                navigate(location ? `/${location}` : "/Admin/Home")
            } else{
                setIsWorker(false)
                navigate("/")
                return
            }
        }
        CheckIfAdmin()
    }, [])
    return(<></>)
}
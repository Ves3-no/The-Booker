import { useEffect } from "react"
import { supabase } from "../supabase"
import CompanyId  from "../CompanyId"
export default function main(){
    useEffect(()=>{
        async function getCustumers(){
            const { data, error } = await supabase
                .from('custumers')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error)
                return
            }
        }
        getCustumers()
    },[])
    return(<>

    </>)
}
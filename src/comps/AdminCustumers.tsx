import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import CompanyId from "../CompanyId"
import type { Custumer } from "../types"

export default function main(){
    const [custumers, setCustumers] = useState<Custumer[] | undefined>()
    const [popup, setPopup] = useState<boolean>(false)
    const [userInTarget, setUserInTarget] = useState<Custumer | undefined>()
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
            setCustumers(data as Custumer[])
        }
        getCustumers()
    }, [])
    async function PromoteToWorker(){
        const { error } = await supabase.rpc('promote_user', {
            p_company_id: CompanyId,
            p_target_user_id: userInTarget?.custumer_id,
            p_make_admin: true
        })
        if(error){
            console.log(error)
            return
        }
    }
    return(<>
        <div className="flex flex-col p-5 w-full gap-8 font-main text-text-primary">
            <h1 className="text-primary font-bold text-3xl">Custumers</h1>
            <div className="overflow-hidden rounded-xl border border-text-secondary shadow-sm">
                <table className="w-full p-3 ">
                    <tr className="">
                        <th className="border-r border-text-secondary">Name</th>
                        <th className="border-x border-text-secondary">Mail</th>
                        <th className="border-x border-text-secondary">Id</th>
                        <th className="border-l border-text-secondary">Promote</th>
                    </tr>
                    {custumers?.map((custumer, index)=>{
                        return(
                        <tr key={index} className="border-t border-text-secondary">
                            <th className="border-r border-text-secondary">{custumer.name}</th>
                            <th className="border-x border-text-secondary">{custumer.mail}</th>
                            <th className="border-x border-text-secondary">{custumer.custumer_id}</th>
                            <th className="border-l border-text-secondary p-1"><button className="px-2 py-1 rounded-lg bg-text-primary text-bg-surface hover:rounded-xs transition-all hover:shadow-2xl" onClick={()=> {setPopup(true), setUserInTarget(custumer)}}>Promote to Worker</button></th>
                        </tr>)
                    })}
                </table>
            </div>
        </div>
        {popup == true ? 
        <div id="popup" className="flex flex-col h-screen w-full bg-black/85 absolute top-0 bottom-0 left-0 justify-center items-center">
            <div className="bg-bg-surface rounded-lg w-150 p-8 flex flex-col justify-center items-center gap-5 -translate-y-16">
                <h1 className="text-text-primary text-2xl font-semibold">Are You sure you want to promote {userInTarget?.name} to a worker?</h1>
                <div className="flex flex-row gap-10">
                    <button className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {setPopup(false), setUserInTarget(undefined)}}>Cancel</button>
                    <button className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {PromoteToWorker(), setPopup(false)}}>Yes</button>
                </div>
            </div>
        </div>: <></>}
    </>)
}
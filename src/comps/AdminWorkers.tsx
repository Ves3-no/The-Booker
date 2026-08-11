import { supabase} from "../supabase"
import { useAppContext } from "../AppContext"
import CompanyId from "../CompanyId"
import { useEffect, useState } from "react"
import type { Admin } from "../types"

export default function main(){
    const { Workers } = useAppContext()
    const [admins, setAdmins] = useState<Admin[]>()
    async function PromoteToAdmin(workerId : string){
        const { error } = await supabase.rpc('promote_to_admin', {
            p_company_id: CompanyId,
            p_worker_id: workerId
        })
        if(error){
            console.log(error.message)
            return
        }
    }
    function checkIfAdmin(workerID: string){
        return admins?.some((admin) => admin.worker_id === workerID)
    }
    useEffect(()=>{
        async function  getAdmins(){
            const { data, error } = await supabase
                .from('admins')
                .select()
                .eq('company_id', CompanyId)
            if(error){
                console.log(error.message)
                return
            }
            setAdmins(data as Admin[])
        }
        getAdmins()
    }, [])
    async function ToggleAutoAccept(checked: boolean, workerID: string){
        const { error } = await supabase
            .from('Workers')
            .update({ auto_accept: checked})
            .eq('id', workerID)
        if(error){
            console.log(error.message)
            return
        }
    }
    async function changeWorkerRole(value: string, workerID: string) {
        const { error } = await supabase
            .from('Workers')
            .update({ role: value})
            .eq('id', workerID)
        if(error){
            console.log(error.message)
            return
        }
    }
    return(<>
        <div className="flex flex-col p-5 w-full gap-8 font-main text-text-primary">
            <h1 className="text-primary font-bold text-3xl">Workers</h1>
            <div className="overflow-hidden rounded-xl border border-text-secondary shadow-sm">
                <table className="w-full p-3 ">
                    <tr className="">
                        <th className="border-r border-text-secondary">Name</th>
                        <th className="border-x border-text-secondary">Role</th>
                        <th className="border-x border-text-secondary">Id</th>
                        <th className="order-x border-text-secondary">Auto Accept</th>
                        <th className="border-l border-text-secondary">Promote</th>
                    </tr>
                    {Workers?.map((worker, index)=>{
                        return(
                            <tr key={index} className="border-t border-text-secondary">
                                <th className="border-r border-text-secondary">{worker.name}</th>
                                <th className="border-x border-text-secondary"><input className="field-sizing-content" type="text" defaultValue={worker.role?? ""} onChange={(e)=> changeWorkerRole(e.currentTarget.value, worker.id)}/></th>
                                <th className="border-x border-text-secondary">{worker.id}</th>
                                <th className="border-x border-text-secondary p-1"><input type="checkbox" name="auto_accept" defaultChecked={Boolean(worker.auto_accept)} onClick={(e)=> ToggleAutoAccept(e.currentTarget.checked, worker.id)}/></th>
                                {checkIfAdmin(worker.id) ? <th className="border-x border-text-secondary">This is an Admin</th>:<th className="border-l border-text-secondary p-1"><button className="px-2 py-1 rounded-lg bg-text-primary text-bg-surface hover:rounded-xs transition-all hover:shadow-2xl" onClick={()=> PromoteToAdmin(worker.id)}>Promote to Admin</button></th>}
                            </tr>)
                    })}
                </table>
            </div>
        </div>
        </>)
}
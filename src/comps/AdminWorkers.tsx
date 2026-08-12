import { supabase} from "../supabase"
import { useAppContext } from "../AppContext"
import CompanyId from "../CompanyId"
import AdminWorkerInTable from './AdminWorkerInTable'
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
                    {Workers?.map((worker, index) => {
                        return (
                            <AdminWorkerInTable
                            key={worker.id}
                            worker={worker}
                            index={index}
                            checkIfAdmin={checkIfAdmin(worker.id)}
                            PromoteToAdmin={PromoteToAdmin(worker.id)}
                            />
                        )
                    })}
                </table>
            </div>
        </div>
        </>)
}
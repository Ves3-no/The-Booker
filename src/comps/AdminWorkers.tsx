import { supabase} from "../supabase"
import { useAppContext } from "../AppContext"
import CompanyId from "../CompanyId"
import AdminWorkerInTable from './AdminWorkerInTable'
import { useEffect, useState } from "react"
import type { Admin, Worker } from "../types"
import AdminWorkerServicePopup from "./AdminWorkerServicePopup.tsx"

export default function main(){
    const { Workers, Services, Worker_Services } = useAppContext()
    const [admins, setAdmins] = useState<Admin[]>()
    const [servicePopup, setServicePopup] = useState<boolean>(false)
    const [workerInQuestionServices, setWorkerInQuestionServices] = useState<Worker | undefined>()
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
                    <thead>
                        <tr className="">
                            <th className="border-r border-text-secondary">Name</th>
                            <th className="border-x border-text-secondary">Role</th>
                            <th className="border-x border-text-secondary">Id</th>
                            <th className="border-x border-text-secondary">Services</th>
                            <th className="order-x border-text-secondary">Auto Accept</th>
                            <th className="border-l border-text-secondary">Promote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Workers?.map((worker, index) => {
                            return (
                                <AdminWorkerInTable
                                key={worker.id}
                                worker={worker}
                                Services={Services}
                                index={index}
                                Worker_Services={Worker_Services}
                                checkIfAdmin={checkIfAdmin(worker.id)}
                                setWorkerInQuestionServices={setWorkerInQuestionServices}
                                setServicePopup={setServicePopup}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {servicePopup == true ? <AdminWorkerServicePopup Services={Services} workerInQuestionServices={workerInQuestionServices} setWorkerInQuestionServices={setWorkerInQuestionServices} setServicePopup={setServicePopup}/>: <></>}
        </div>
        </>)
}
import type { Worker } from "../types"
import { supabase } from "../supabase"
import { useState } from "react"
export default function main({index, worker, checkIfAdmin, PromoteToAdmin}: {index: number, worker: Worker, checkIfAdmin: any, PromoteToAdmin: any}){
    const [workerRole, setWorkerRole] = useState<string>(worker.role?? "")
    const [popup, setPopup] = useState<boolean>(false)
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
    return(
        <>
        <tr key={index} className="border-t border-text-secondary">
            <th className="border-r border-text-secondary">{worker.name}</th>
            <th className="border-x border-text-secondary"><input className="field-sizing-content" type="text" value={workerRole} onChange={(e)=> {changeWorkerRole(e.currentTarget.value, worker.id), setWorkerRole(e.currentTarget.value)}}/></th>
            <th className="border-x border-text-secondary">{worker.id}</th>
            <th className="border-x border-text-secondary p-1"><input type="checkbox" name="auto_accept" defaultChecked={Boolean(worker.auto_accept)} onClick={(e)=> {ToggleAutoAccept(e.currentTarget.checked, worker.id)}}/></th>
            {checkIfAdmin ? <th className="border-x border-text-secondary">This is an Admin</th>:<th className="border-l border-text-secondary p-1"><button className="px-2 py-1 rounded-lg bg-text-primary text-bg-surface hover:rounded-xs transition-all hover:shadow-2xl" onClick={()=> setPopup(true)}>Promote to Admin</button></th>}
        </tr>
        {popup == true ? 
        <div id="popup" className="flex flex-col h-screen w-full bg-black/85 absolute top-0 bottom-0 left-0 justify-center items-center">
            <div className="bg-bg-surface rounded-lg w-150 p-8 flex flex-col justify-center items-center gap-5 -translate-y-16">
                <h1 className="text-text-primary text-2xl font-semibold">Are You sure you want to promote this worker to an Admin?</h1>
                <div className="flex flex-row gap-10">
                    <button className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {setPopup(false)}}>Cancel</button>
                    <button className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {PromoteToAdmin(), setPopup(false)}}>Yes</button>
                </div>
            </div>
        </div>: <></>}
        </>)
}
import { useState, type Dispatch, type SetStateAction } from "react";
import { supabase } from "../supabase";
import type { Service, Worker } from "../types";
import CompanyId from "../CompanyId";
import { useAppContext } from "../AppContext";

export default function app({Services, workerInQuestionServices, setWorkerInQuestionServices, setServicePopup}: {Services: Service[] | undefined, workerInQuestionServices: Worker | undefined, setWorkerInQuestionServices: Dispatch<SetStateAction<Worker | undefined>> , setServicePopup: Dispatch<SetStateAction<boolean>> }){
    const [theChekedOnes, setTheChekedOnes] = useState<Service[]>()
    const {setRefreshTrigger} = useAppContext()
    async function ToggleServices(){
        if(!theChekedOnes || !workerInQuestionServices){
                console.log("something is wrong 1")
                return
            }
        console.log("started 1 ")
        async function deleate() {
             const {error} = await supabase
            .from('worker_services')
            .delete()
            .eq('worker_id', workerInQuestionServices?.id)
        if(error){
            console.log(error.message)
            return
        }
        }
        async function add(){
            if(!theChekedOnes || !workerInQuestionServices){
                console.log("something is wrong 2")
                return
            }
            console.log("started 2")
            const rowsToInsert = theChekedOnes.map(checked => ({
                worker_id: workerInQuestionServices.id,
                service_id: checked.id, 
                company_id: CompanyId
            }));
            const { error } = await supabase
                .from('worker_services')
                .insert(rowsToInsert);
            if (error) {
                console.error(error.message);
                return
            }
        }
        async function handleUpdate() {
            await deleate();
            await add();   
            setRefreshTrigger(prev => prev + 1);
            console.log("sucsess")
        }
        handleUpdate()
    }
    return(
    <div id="servicePopup" className="flex flex-col h-screen w-full bg-black/85 absolute top-0 bottom-0 left-0 justify-center items-center">
        <div className="bg-bg-surface rounded-lg w-150 p-8 flex flex-col justify-center items-center gap-8 -translate-y-16 ">
            <h1 className="text-text-primary text-xl font-bold ">Select the Services you want this worker to be avalible in</h1>
            <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                {Services?.map((service, index)=> 
                <label key={index} className="cursor-pointer">
                    <input
                    type="checkbox"
                    className="sr-only peer"
                    onClick={(e) => {
                        if (e.currentTarget.checked) {
                        setTheChekedOnes((prev) => [...(prev ?? []), service]);
                        } else {
                        setTheChekedOnes((prev) => (prev ?? []).filter((s) => s.id !== service.id));
                        }
                    }}
                    />
                    <span className="text-text-primary px-3 border p-2 rounded-2xl font-medium border-text-secondary peer-hover:shadow-2xl peer-checked:bg-primary  peer-checked:text-bg-surface transition-all">{service.name}</span>
                </label>
                )}
            </div>
            <div className="flex gap-5">
                <button className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {setWorkerInQuestionServices(undefined), setServicePopup(false)}}>Cancel</button>
                <button className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {ToggleServices(), setWorkerInQuestionServices(undefined), setServicePopup(false)}}>Save</button>
            </div>
            </div>
    </div>
    )
}
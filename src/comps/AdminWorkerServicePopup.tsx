import { useState, type Dispatch, type SetStateAction } from "react";
import { supabase } from "../supabase";
import type { Service, Worker } from "../types";
import CompanyId from "../CompanyId";

export default function app({Services, workerInQuestionServices, setWorkerInQuestionServices, setServicePopup}: {Services: Service[] | undefined, workerInQuestionServices: Worker | undefined, setWorkerInQuestionServices: Dispatch<SetStateAction<Worker | undefined>> , setServicePopup: Dispatch<SetStateAction<boolean>> }){
    const [theChekedOnes, setTheChekedOnes] = useState<Service[]>()
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
            console.log("sucsess")
        }
        handleUpdate()
    }
    return(
    <div id="servicePopup" className="flex flex-col h-screen w-full bg-black/85 absolute top-0 bottom-0 left-0 justify-center items-center">
        <div className="bg-bg-surface rounded-lg w-150 p-8 flex flex-col justify-center items-center gap-5 -translate-y-16">
            <div className="flex flex-row flex-wrap">
                {Services?.map((service, index)=> 
                <div key={index}>
                    <label htmlFor={`ServiceToggle${service.id}`}>{service.name}</label>
                    <input
                    type="checkbox"
                    name={`ServiceToggle${service.id}`}
                    onClick={(e) => {
                        if (e.currentTarget.checked) {
                        setTheChekedOnes((prev) => [...(prev ?? []), service]);
                        } else {
                        setTheChekedOnes((prev) => (prev ?? []).filter((s) => s.id !== service.id));
                        }
                    }}
                    />
                </div>
                )}
            </div>
            <div>
                <button className='p-2 rounded-xl border border-text-primary text-text-primary w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {setWorkerInQuestionServices(undefined), setServicePopup(false)}}>Cancel</button>
                <button className='p-2 rounded-xl bg-text-primary text-bg-main w-30 text-md hover:rounded-xs transition-all hover:shadow-2xl' onClick={()=> {ToggleServices(), setWorkerInQuestionServices(undefined), setServicePopup(false)}}>Save</button>
            </div>
            </div>
    </div>
    )
}
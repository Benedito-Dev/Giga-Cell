import { ChevronLeftIcon } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function TaskPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const title = searchParams.get('title')
    const description = searchParams.get('description')

    return (
        <div className="w-[500px] space-y-4">
            <div className="flex justify-center relative mb-6" >
            <button onClick={() => navigate(-1)} className="absolute left-0 top-0 bg-transparent">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-3xl text-slate-100 font-bold text-center" >Detalhes Da Tarefa</h1>
            </div>

            <div className="bg-slate-400 rounded-md p-6 gap-10 m-0" >
                <h2 className="text-2xl text-slate-100 font-bold">{title}</h2>
                <p className="text-lg text-slate-100 mt-8">{description}</p>
            </div>
        </div>
    )
}

export default TaskPage
import { ChevronsRightIcon, TrashIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Task(props) {
    const navigate = useNavigate()

    function onSeeDetailsClick(task) {
        const query = new URLSearchParams();
        query.set("title", task.title);
        query.set("description", task.description);
        navigate(`/task?${query.toString()}`);
    }

    return (
        <ul className="space-y-4 p-6 bg-slate-200 shadow rounded-md">
            {props.tasks.map((task) => (
                <li key={task.id} className="flex gap-2">
                <button className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${task.isCompleted && 'line-through'}`}
                onClick={() => props.onTaskClick(task.id)}>
                    {task.title}
                </button>
                <button onClick={() => onSeeDetailsClick(task)} className="bg-slate-400  text-white p-2 rounded-md">
                    <ChevronsRightIcon />
                </button>
                <button onClick={() => props.onDeleteTaskClick(task.id)} className="bg-red-500  text-white p-2 rounded-md">
                    <TrashIcon />
                </button>
                </li>
            ))}
        </ul>
    )
}

export default Task
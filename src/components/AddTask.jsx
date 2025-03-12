import { useState } from "react"

function AddTask({ onAddTaskSubmit }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div className="grid space-y-4 p-6 mb-5 mt-5 bg-slate-200 shadow rounded-md">
            <input className="bg-slate-50 outline-slate-400 text-sky-400 p-3 rounded-md shadow" type="text" 
            name="title" id="" placeholder="Titulo da tarefa" value={title} onChange={(event) =>setTitle(event.target.value)}/>
            <input className="bg-slate-50 outline-slate-400 text-sky-400 p-3 rounded-md shadow" type="text" 
            name="description" id="" placeholder="Descrição da tarefa" value={description} onChange={(event) =>setDescription(event.target.value)}/>
            <button onClick={() => {
                // Verificar se as informações estão preenchidas
                if (!title.trim() || !description.trim()) {
                    return alert("Preencha todos os campos");
                }
                onAddTaskSubmit(title, description)
                setTitle("")
                setDescription("")
                }} className="bg-slate-400">Adicionar</button>
        </div>
    )
}

export default AddTask
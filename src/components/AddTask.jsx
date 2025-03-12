function AddTask({ onAddTaskSubmit }) {
    return (
        <div className="grid space-y-4 p-6 mb-5 mt-5 bg-slate-200 shadow rounded-md">
            <input className="bg-slate-50 outline-slate-400 text-sky-400 p-3 rounded-md shadow" type="text" name="title" id="" placeholder="Titulo da tarefa"/>
            <input className="bg-slate-50 outline-slate-400 text-sky-400 p-3 rounded-md shadow" type="text" name="description" id="" placeholder="Descrição da tarefa"/>
            <button onClick={onAddTaskSubmit()} className="bg-slate-400">Adicionar</button>
        </div>
    )
}

export default AddTask
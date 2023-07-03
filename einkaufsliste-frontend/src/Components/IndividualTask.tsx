import { useState } from 'react'

const style = {
  taskItem: {
    wrapper: 'bg-slate-500 text-white flex items-center p-3 rounded-md w-fit m-2',
    checkbox: 'mr-2 aspect-square w-6',
    title: 'mr-2',
    created_at: 'mr-2',
  },
}

interface Task {

  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;

}


interface TaskProps {
  task: Task;
  onUpdate: (updatedTask: Task, updatedTaskId: number) => void;
  onDelete: (deletedTask: number) => void;
  onAdd: (addedTask: Task) => void;
}



function IndividualTask({ task, onUpdate, onDelete, onAdd }: TaskProps) {
  const [editId, setEditId] = useState<number | null>();
  const handleEditClick = () => {
    setEditId(task.id);
  }
  return (
    <div className={style.taskItem.wrapper}>
      <input type="checkbox" defaultChecked={task.status} className={style.taskItem.checkbox} />
      <h1 className={style.taskItem.title}>{task.title}</h1>
      <span className={style.taskItem.created_at}>{new Date(task.created_at).toLocaleDateString()}</span>
      <button onClick={() => handleEditClick()}>✏️</button >
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  )
} export default IndividualTask;
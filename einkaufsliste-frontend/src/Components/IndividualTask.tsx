import { useState } from 'react'
interface Task {
  id?: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;
}


interface TaskProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (deletedTask: number) => void;
}

function IndividualTask({ task, onUpdate, onDelete }: TaskProps) {
  const [editId, setEditId] = useState<number | null>();
  const handleEditClick = () => {
    setEditId(task.id);
  }
  return (
    <div>
      <button onClick={() => handleEditClick()}>✏️</button >
      <input type="checkbox" defaultChecked={task.status} />
      <h1>{task.title}</h1>
      <span>{new Date(task.created_at).toLocaleDateString()}</span>
    </div>
  )
} export default IndividualTask;
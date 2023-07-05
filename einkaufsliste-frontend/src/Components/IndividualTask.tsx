import { useState } from 'react';

const style = {
  taskItem: {
    wrapper: 'bg-slate-500 text-white flex items-center p-3 rounded-md w-fit m-2',
    checkbox: 'mr-2 aspect-square w-6',
    title: 'mr-2',
    created_at: 'mr-2',
    inputField: 'text-white bg-gray-800', 
  },
};

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
  const [editId, setEditId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleEditClick = () => {
    setEditId(task.id);
    setEditedTitle(task.title);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBlur = () => {
    if (editedTitle.trim() !== '') {
      const updatedTask: Task = { ...task, title: editedTitle };
      onUpdate(updatedTask, task.id);
    }
    setEditId(null);
  };

  const handleCheckboxClick = () => {
    const updatedStatus = !taskStatus;
    setTaskStatus(updatedStatus);

    const updatedTask: Task = { ...task, status: updatedStatus };
    onUpdate(updatedTask, task.id);
  };

  return (
    <div className={style.taskItem.wrapper}>
      <input
        type="checkbox"
        checked={taskStatus}
        className={style.taskItem.checkbox}
        onClick={handleCheckboxClick}
      />
      {editId === task.id ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          autoFocus
          className={style.taskItem.inputField} // Apply the inputField class
        />
      ) : (
        <>
          <h1 className={style.taskItem.title}>{task.title}</h1>
          <span className={style.taskItem.created_at}>{new Date(task.created_at).toLocaleDateString()}</span>
          <button onClick={handleEditClick}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </>
      )}
    </div>
  );
}

export default IndividualTask;
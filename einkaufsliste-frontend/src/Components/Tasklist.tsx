import IndividualTask from './IndividualTask';
import Navigation from './Navigation';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (updatedTask: Task, updatedTaskId: number) => void;
  onDelete: (deletedTask: number) => void;
  onAdd: (addedTask: Omit<Task, "id" | "created_at">) => void;
  onLogout: () => void;
  onDeleteAll: () => void;
  
}

function TaskList({ tasks, onUpdate, onDelete, onAdd, onDeleteAll, onLogout }: TaskListProps) {
  const [showForm, setShowForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleNewTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    const newTask: Omit<Task, "id" | "created_at"> = {
      title: newTaskTitle,
      status: false,
      fk_user_id: 1, 
    };

    onAdd(newTask);
    setNewTaskTitle('');
    setShowForm(false);
  };

  return (
    <div>
      <Navigation onDeleteAll={onDeleteAll} logout={onLogout}/>
     

      <h1 className='text-center text-3xl'>Task List</h1>
      <div className='my-5 flex flex-col items-center'>
        {tasks.map((task) => (
          <IndividualTask
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAdd={onAdd}
          />
        ))}
      </div>
      <button onClick={() => setShowForm(true)} className='bg-cyan-900 px-2 pb-0.5 text-center text-white rounded-lg m-2'>Add Item</button>

      {showForm && (
        <form onSubmit={handleAddTask} className='m-2'>
          <input
            type="text"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
            placeholder="Enter task title"
            className='border rounded-md mr-1'
          />
          <button type="submit" className='bg-cyan-900 px-2 pb-0.5 text-center text-white rounded-lg'>Add Task</button>
        </form>
      )}
    </div>
  );
}

export default TaskList;

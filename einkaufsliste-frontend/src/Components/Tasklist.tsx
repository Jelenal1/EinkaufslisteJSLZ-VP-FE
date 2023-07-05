import IndividualTask from './IndividualTask';
import Navigation from './Navigation';

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
  onAdd: (addedTask: Task) => void;
  
  onLogout: () => void;
  onDeleteAll: () => void;
}


function TaskList({ tasks, onUpdate, onDelete, onAdd, onDeleteAll, onLogout}: TaskListProps) {
  return (
    <div>
      <Navigation />
      <input type='button' onClick={() => onDeleteAll()} value="delete All "></input>
      <input type='button' onClick={() => onLogout()} value="logout"></input>


      <h1 className='text-center text-3xl'>Task List</h1>
      <div className='my-5 flex flex-col items-center'>

        {tasks.map((task) => (
          <IndividualTask key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;

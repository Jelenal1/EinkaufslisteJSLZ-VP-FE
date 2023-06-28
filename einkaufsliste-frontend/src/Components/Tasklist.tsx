import IndividualTask from './IndividualTask';

interface Task {
  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;
}


interface TaskListProps {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
  onDelete: (deletedTask: number) => void;
  onAdd: (addedTask: Task) => void;
}


function TaskList({ tasks, onUpdate, onDelete, onAdd }: TaskListProps) {
  return (
    <div>
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

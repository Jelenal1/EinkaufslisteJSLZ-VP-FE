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
      {tasks.map((task) => (
        <IndividualTask key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default TaskList;

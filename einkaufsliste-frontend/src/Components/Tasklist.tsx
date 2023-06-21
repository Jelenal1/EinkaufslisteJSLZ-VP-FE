import IndividualTask from './IndividualTask';

interface Task {
  id?: number;
  title: string;
  status: boolean;
  created_at?: number;
  fk_user_id: number;
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
  onDelete: (deletedTask: number) => void;
}

function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <IndividualTask key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
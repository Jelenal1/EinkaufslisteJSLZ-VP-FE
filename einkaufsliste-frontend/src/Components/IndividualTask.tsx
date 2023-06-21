import React from "react";


interface Task {
  id?: number;
  title: string;
  status: boolean;
  created_at?: number;
  fk_user_id: number;
}


interface TaskProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (deletedTask: Task) => void;
}

function IndividualTask({ task, onUpdate, onDelete }: TaskProps) {
  return(
    <div>
      <h1>{task.title}</h1>
    </div>

  )
} export default IndividualTask;
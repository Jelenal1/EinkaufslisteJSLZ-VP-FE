import { useState, useEffect } from 'react'
import Tasklist from '../Components/Tasklist';

interface Task {
  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;
}

function App() {
  const [tasks, settasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Task 1',
      status: false,
      created_at: Date.now(),
      fk_user_id: 1
    }
  ])

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {

    }
    catch {

    }
  }

  async function updateTasks() {
    try {

    }
    catch {

    }
  }

  async function deleteTask() {
    try {

    }
    catch {

    }
  }


  return (
    <>
      <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask} />
    </>
  )
}

export default App

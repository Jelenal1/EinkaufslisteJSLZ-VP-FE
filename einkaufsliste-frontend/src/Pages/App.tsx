import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Tasklist from '../Components/Tasklist';

interface Task {
  id?: number;
  title: string;
  status: boolean;
  created_at?: number;
  fk_user_id: number;
}

function App() {
  const [tasks, settasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks () {
    try{
      
    }
    catch {

    }
  }

  async function updateTasks() {
    try{

    }
    catch {

    }
  }

  async function deleteTask() {
    try{

    }
    catch{
      
    }
  }


  return (
    <div>
      <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask}/>


    </div>
  )
}

export default App

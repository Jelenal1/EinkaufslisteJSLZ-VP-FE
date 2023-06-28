import { useState, useEffect } from 'react'
import Tasklist from '../Components/Tasklist';
import axios from 'axios';

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

      const response = await axios.get<Task[]>("the backend string");
      const fetchedTasks = response.data;
      settasks(fetchedTasks);


    }
    catch (error) {
      console.error("couldnt fetch", error)
    }
  }


  async function updateTasks(updatedTask: Task) {

    try {
      await axios.patch<Task>("the backend string", updatedTask);
      fetchTasks();


    }
    catch (error) {
      console.error("couldnt update", error)
    }
  }

  async function deleteTask(deleteTaskId: number) {

    try {
      await axios.delete("backend string/deleteTaskId");
      fetchTasks();
    }
    catch (error) {
      console.error("couldnt delete", error);
    }
  }


  async function postTask(addedTask: Task) {
    try {
      await axios.post<Task>("the backend string", addedTask);
      fetchTasks();
    }
    catch (error) {
      console.error("couldnt post", error);

    }
  }


  return (

    <>
      <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask} onAdd={postTask} />
    </>

  )
}

export default App

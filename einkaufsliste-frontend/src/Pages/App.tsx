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



  /*async function login() {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        withCredentials: true,
        code: 12345
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }*/

  async function login() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ code: 12345 }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
       
        const cookie = data.cookie;
        if (cookie) {
          document.cookie = `connect.sid=${cookie}`;
        }
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.error('Login failed', response);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        console.log(fetchedTasks);
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.error('Could not fetch', response);
      }
    } catch (error) {
      console.error('Could not fetch', error);
    }
  }
  
  async function updateTasks(updatedTaskId: number) {
    try {
      await axios.patch(`http://localhost:3000/items/${updatedTaskId}`, null, {
        withCredentials: true, // Include cookies
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't update", error);
    }
  }
  
  async function deleteTask(deleteTaskId: number) {
    try {
      await axios.delete(`http://localhost:3000/items/${deleteTaskId}`, {
        withCredentials: true, // Include cookies
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't delete", error);
    }
  }
  
  async function postTask(addedTask: Task) {
    try {
      await axios.post<Task>('http://localhost:3000/items', addedTask, {
        withCredentials: true, // Include cookies
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't post", error);
    }
  }

  useEffect(() => {
    login();
    setTimeout(() => {
      fetchTasks();
    }, 1000);
    
    
    
  }, []); 

  return (

    <>
      <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask} onAdd={postTask} />
    </>

  )
}

export default App

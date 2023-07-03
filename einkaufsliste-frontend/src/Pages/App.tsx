import { useState, useEffect } from 'react'
import Tasklist from '../Components/Tasklist';
import axios from 'axios';

export interface Task {

  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;

}

function App() {
  const [tasks, settasks] = useState<Task[]>([]);



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
        const cookie = data.cookie;
        if (cookie) {
          document.cookie = `connect.sid=${cookie}; SameSite=None; Secure`;
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
        credentials: 'include',
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        settasks(fetchedTasks);
        console.log(fetchedTasks)
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.error('Could not fetch', response);
      }
    } catch (error) {
      console.error('Could not fetch', error);
    }
  }

  async function updateTasks(updatedTask: Task, updatedTaskId: number) {
    try {
      await fetch(`http://localhost:3000/items/${updatedTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'withCredentials': 'true'
        },
        credentials: 'include',
        body: JSON.stringify(updatedTask)
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't update", error);
    }
  }

  async function deleteTask(deleteTaskId: number) {
    try {
      await fetch(`http://localhost:3000/items/${deleteTaskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't delete", error);
    }
  }

  async function postTask(addedTask: Task) {
    try {
      await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addedTask),
      });
      fetchTasks();
    } catch (error) {
      console.error("Couldn't post", error);
    }
  }



  return (

    <>
      <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask} onAdd={postTask} />
    </>

  )
}

export default App

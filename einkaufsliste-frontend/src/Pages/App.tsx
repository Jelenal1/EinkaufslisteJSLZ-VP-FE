import { useState, useEffect } from 'react'
import Tasklist from '../Components/Tasklist';
import axios from 'axios';
import Login from './Login';

export interface Task {

  id: number;
  title: string;
  status: boolean;
  created_at: number;
  fk_user_id: number;

}

function App() {
  const [tasks, settasks] = useState<Task[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);



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

  async function login(password: number) {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code: password }),
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

  async function logout() {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });

      if (response.ok) {

        console.log('Logged out successfully');
      } else {
        console.error('Logout failed', response);
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
  async function deleteList() {
    try {
      const response = await fetch('http://localhost:3000/list', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {

        console.log('List deleted successfully');
        fetchTasks();
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else {
        console.error('Delete failed', response);
      }
    } catch (error) {
      console.error('Delete failed', error);
    }
  }

  async function getSession() {


    try {

      const response = await fetch('http://localhost:3000/session', {

        method: 'GET',

        credentials: 'include',

      });


      if (response.ok) {

        const sessionData = await response.json();

        setLoggedIn(true);

      } else if (response.status === 401) {

        console.log('Unauthorized');
        setLoggedIn(false);

      } else {

        console.error('Failed to get session', response);
        setLoggedIn(false);

      }

    } catch (error) {

      console.error('Failed to get session', error);

    }

  }

  useEffect(() => {
    getSession();
    fetchTasks();
  }, [])

  return (
    <>
      {
        loggedIn ?
          <Tasklist tasks={tasks} onUpdate={updateTasks} onDelete={deleteTask} onAdd={postTask} onLogout={logout} onDeleteAll={deleteList} />
          : <Login login={login} getSession={getSession} />
      }
    </>



  )
}

export default App

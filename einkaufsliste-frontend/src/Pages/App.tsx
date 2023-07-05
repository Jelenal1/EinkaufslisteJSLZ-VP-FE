import { useState, useEffect } from 'react'
import Tasklist from '../Components/Tasklist';
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
          await fetchTasks();
          setLoggedIn(true);
        }
        
      } else if (response.status === 401) {
        console.log('Unauthorized');
        setLoggedIn(false);
      } else {
        console.error('Login failed', response);
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async function signUp(password: number) {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const cookie = data.cookie;
        if (cookie) {
          document.cookie = `connect.sid=${cookie}; SameSite=None; Secure`;
          await fetchTasks();
          setLoggedIn(true);
        }
        
      } else if (response.status === 401) {
        console.log('Unauthorized');
        setLoggedIn(false);
      } else {
        console.error('Login failed', response);
        setLoggedIn(false);

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
    console.log(updatedTask);
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
      await fetchTasks();
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
      await fetchTasks();
    } catch (error) {
      console.error("Couldn't delete", error);
    }
  }

  async function postTask(newTask: Omit<Task, "id" | "created_at">) {
    try {
      await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newTask),
      });
      await fetchTasks();
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

        document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
        console.log('Logged out successfully');
        setLoggedIn(false);
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
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: 'include',
        
      });

      if (response.ok) {

        console.log('List deleted successfully');
        await fetchTasks();
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
          : <Login login={login} signUp={signUp} />
      }
    </>



  )
}

export default App

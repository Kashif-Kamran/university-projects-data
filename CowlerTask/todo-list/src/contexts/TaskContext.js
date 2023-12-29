import React,{ createContext,useState,useEffect } from 'react';
import axios from 'axios';
export const TaskContext = createContext();

export const TaskProvider = ({ children }) =>
{
    // Tasks State
    const [tasks,setTasks] = useState([]);
    // Function to fetch all tasks
    const fetchTasks = () =>
    {
        axios.get('http://localhost:5000/tasks')
            .then(response =>
            {
                const tasksData = response.data.map(task => ({
                    ...task,
                    completionDate: new Date(task.completionDate),
                    creationDate: new Date(task.creationDate)
                }));
                console.log("Date Formate : ",tasksData);
                setTasks(tasksData);
            })
            .catch(error =>
            {
                console.error('Error fetching tasks:',error);
            });
    };

    // useEffect to fetch tasks when component mounts
    useEffect(() =>
    {
        fetchTasks();
    },[]);
    // Function to add task
    const addTask = (task) =>
    {
        axios.post('http://localhost:5000/tasks',task)
            .then(response =>
            {
                const createdTask = response.data;
                createdTask.completionDate = new Date(createdTask.completionDate);
                setTasks([...tasks,createdTask]);
            })
            .catch(error =>
            {
                console.error('Error creating task:',error);
            });
    };
    // Function to delete task
    const deleteTask = (taskId) =>
    {
        axios.delete(`http://localhost:5000/tasks/${taskId}`)
            .then(() =>
            {
                // Remove the deleted task from the tasks state
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            })
            .catch(error =>
            {
                console.error('Error deleting task:',error);
            });
    };


    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

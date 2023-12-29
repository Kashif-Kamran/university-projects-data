import React,{ useContext,useEffect,useState } from 'react';
import Task from "./Task";
import { TaskContext } from '../contexts/TaskContext';
import { MenuContext } from '../contexts/MenuContext';

const TaskList = () =>
{
    const { tasks,deleteTask } = useContext(TaskContext);
    const { selectedMenu } = useContext(MenuContext);
    const [filteredTasks,setFilteredTasks] = useState([]);
    useEffect(() =>
    {
        console.log("-- Tasks List Refreshed -- ");
        if (selectedMenu === "0")
        {
            // it means we are inboxed so it shoudl show all the tasks
            setFilteredTasks(tasks);
        }
        else if (selectedMenu === "1")
        {
            const today = new Date(); // Get the current date

            const tasksDueToday = tasks.filter(task =>
            {
                const completionDate = task.completionDate;
                return (
                    completionDate.getDate() === today.getDate() &&
                    completionDate.getMonth() === today.getMonth() &&
                    completionDate.getFullYear() === today.getFullYear()
                );
            });

            console.log(tasksDueToday);


            setFilteredTasks(tasksDueToday)
        }
        else if (selectedMenu === "2")
        {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1); // Get the date for tomorrow

            const tasksDueTomorrow = tasks.filter(task =>
            {
                const completionDate = task.completionDate;
                return (
                    completionDate.getDate() === tomorrow.getDate() &&
                    completionDate.getMonth() === tomorrow.getMonth() &&
                    completionDate.getFullYear() === tomorrow.getFullYear()
                );
            });

            console.log(tasksDueTomorrow);


            setFilteredTasks(tasksDueTomorrow)
        }
    },[selectedMenu,tasks])

    return (
        <div className="rounded-lg bg-white mt-4 text-gray-700 max-h-64  overflow-auto">
            {filteredTasks.map((task,index) => (
                <React.Fragment key={task._id}>
                    <Task id={task._id} title={task.title} deleteTask={deleteTask} />
                    {index !== tasks.length - 1 && <hr className="border-solid border-1 border-black" />}
                </React.Fragment>
            ))}
        </div>
    );

};

export default TaskList;

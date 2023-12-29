import React,{ useContext,useState,useRef } from "react";
import { TaskContext } from "../contexts/TaskContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const task = {
    id: 1,
    title: "Task 1",
    creationDate: Date.now(),
    completionDate: "Something",
    isCompleted: false,
};

const CreateNewTask = () =>
{
    const [taskTitle,setTaskTitle] = useState("");
    const [selectedDate,setSelectedDate] = useState(null);
    const { addTask } = useContext(TaskContext);
    const dateRef = useRef();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (taskTitle.trim() !== "")
        {
            let tempDate = undefined;
            if (selectedDate !== null)
            {
                tempDate = selectedDate;
            } else
            {
                tempDate = new Date();
            }

            console.log("selected Date :  ",selectedDate,"TempDate : ",tempDate);
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                creationDate: new Date(),
                completionDate: tempDate,
                isCompleted: false,
            };

            console.log(newTask);
            addTask(newTask);

            setTaskTitle("");
            setSelectedDate(null);
            dateRef.current.clear();
        }
    };

    const toggleDatePicker = () =>
    {
        dateRef.current.setOpen((prevOpen) => !prevOpen); // Toggle the date picker
    };

    return (
        <div className="h-16 mt-12 w-full text-purple-950 rounded-lg flex justify-between px-5 items-center active:border-solid active:border- bg-opacity-50 bg-yellow-50 opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
            <input
                className="h-8 w-4/6 bg-transparent border-solid border-2 border-purple-900 rounded-md shadow-lg px-2"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Add a new task..."
            />
            <button
                id="DateButton"
                className="ml-10 active:text-gray-300"
                onClick={toggleDatePicker}
            >
                <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-calendar-event"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                    ></path>
                    <path d="M16 3l0 4"></path>
                    <path d="M8 3l0 4"></path>
                    <path d="M4 11l16 0"></path>
                    <path d="M8 15h2v2h-2z"></path>
                </svg>
            </button>
            <DatePicker className="hidden" ref={dateRef} selected={selectedDate} onChange={date => setSelectedDate(date)} />
            <button
                className="bg-purple-800 px-4 py-1 rounded-md text-black active:text-white active:bg-purple-950"
                onClick={handleSubmit}
            >
                Add
            </button>
        </div>
    );
};

export default CreateNewTask;

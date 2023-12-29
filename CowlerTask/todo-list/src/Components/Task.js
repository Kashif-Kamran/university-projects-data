import React,{ useState } from 'react';

const Task = ({ title,id,deleteTask }) =>
{
    const [isChecked,setIsChecked] = useState(false);
    const [showMenu,setShowMenu] = useState(false);

    const handleCheckboxChange = () =>
    {
        setIsChecked(!isChecked);
    };
    function onMenuClick()
    {
        setShowMenu(!showMenu);
    }
    function handleDelete()
    {
        deleteTask(id);

    }
    return (
        <>
            <div className="py-4 px-4 flex justify-between items-center">
                <input
                    type="checkbox"
                    id={`taskCheckbox_${id}`}
                    className="hidden"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label
                    htmlFor={`taskCheckbox_${id}`}
                    className="mr-4 inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer transition-colors duration-300"
                >
                    <svg
                        className={`w-4 h-4 fill-current ${isChecked ? 'block' : 'hidden'
                            } pointer-events-none`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                </label>

                <h1 className="w-4/6">{title}</h1>
                <div className=' w-1/6 border-solid boder-2 flex items-center justify-end'>
                    {
                        !showMenu ? (
                            <button className='active:text-gray-300' onClick={onMenuClick} >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-grip-vertical"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                </svg>
                            </button>
                        ) :
                            (
                                <>
                                    <button className='mx-5 active:text-gray-300' onClick={onMenuClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M18 6l-12 12"></path>
                                            <path d="M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                    <button className='active:text-gray-300' onClick={handleDelete}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M4 7l16 0"></path>
                                            <path d="M10 11l0 6"></path>
                                            <path d="M14 11l0 6"></path>
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                        </svg>
                                    </button>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    );
};

export default Task;

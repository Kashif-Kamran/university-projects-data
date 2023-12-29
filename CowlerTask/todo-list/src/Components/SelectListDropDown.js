import React,{ useContext,useEffect,useState } from 'react';
import { TaskContext } from "../contexts/MenuContext"
import { MenuContext } from '../contexts/MenuContext';
const data = [
    {
        name: "Inbox",
        id: "0"
    },
    {
        name: "Today",
        id: "1"
    },
    {
        name: "Tomorrow",
        id: "2"

    }
]
const SelectListDropDown = () =>
{
    const [isOpen,setOpen] = useState(false);
    const [selectedList,setSelectedList] = useState(data[0]);
    const { updateSelectedMenu } = useContext(MenuContext);
    const onListItemClick = (event) =>
    {
        setSelectedList((prev) =>
        {
            const value = data.find((item) => item.id === event.target.value);
            updateSelectedMenu(value.id);
            return value;
        });
    }
    const onMenuClick = () =>
    {
        setOpen((prev) =>
        {
            return !prev;
        });
    }
    return (
        <div className='min-h-24 border-solid flex  flex-col justify-center items-center '>
            <button onClick={onMenuClick} className="h-14 w-full text-purple-950 rounded-lg flex justify-between px-5 items-center active:border-solid active:border-4 active:border-white bg-opacity-50 bg-yellow-50 opacity-80 backdrop-filter backdrop-blur-lg shadow-lg">
                <div className='w-2/4 flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 6l16 0"></path>
                        <path d="M4 12l16 0"></path>
                        <path d="M4 18l16 0"></path>
                    </svg>
                    <h1 className="ml-3  font-mono font-bold" >{selectedList.name}</h1>
                </div>
                {
                    isOpen ?
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-up-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z" stroke-width="0" fill="currentColor"></path>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-down-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" stroke-width="0" fill="currentColor"></path>
                        </svg>
                }

            </button>
            {
                isOpen && <div className=' mt-2 h-14 w-full font-mono font-bold text-purple-950 rounded-lg flex justify-between px-5 items-center active:border-solid active:border-4 active:border-white bg-opacity-50 bg-yellow-50 opacity-80 backdrop-filter backdrop-blur-lg shadow-lg'>
                    {data.map((item) =>
                    {
                        return (
                            <button value={item.id} onClick={onListItemClick} className=' mx-2 flex px-2 py-4 hover:border-solid hover:border-l-4 hover:border-white'>
                                {item.name}
                            </button>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default SelectListDropDown;

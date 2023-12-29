import React,{ createContext,useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) =>
{
    const [selectedMenu,setSelectedMenu] = useState("0");

    const updateSelectedMenu = (menu) =>
    {
        console.log("Menu Value : ",menu,"Type : ",typeof menu)
        setSelectedMenu(menu);
    };

    return (
        <MenuContext.Provider value={{ selectedMenu,updateSelectedMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

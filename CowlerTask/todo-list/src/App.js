import Avatar from "./Components/Avatar"
import SelectListDropDown from "./Components/SelectListDropDown"
import TaskList from "./Components/TaskList"
import CreateNewTask from "./Components/CreateNewTask";
import background from "./static/images/bgImg.jpg"

export default function App()
{
  return (
    <div
      className="p-0 min-w-screen font-mono h-screen text-white relative"
    >
      <div id="background"
        style={{
          backgroundImage:
            `url(${background})`
        }}
        className="absolute w-full h-full bg-no-repeat bg-cover bg-center filter blur-sm"

      > </div>
      <div
        id="main"
        className="px-16 mx-auto sm:w-3/4 lg:w-1/2 h-screen transition-all duration-500 relative z-10"
      >

        <div id="forground" className="z-10">
          <Avatar />
          <SelectListDropDown />
          <TaskList />
          <CreateNewTask />
        </div>
      </div>
    </div>
  );
}
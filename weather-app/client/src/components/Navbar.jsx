
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Navbar = () =>
{
    return (
        <div className="bg-[#232931] w-[70%] px-4 py-3 flex justify-between items-center rounded-full">
            <SearchBar />
            <div className="w-[30%] flex text-white text-[1.1rem] ">
                <Link to="/favourites" className="w-[50%] text-center hover:text-[#303f9f] outline-none" >
                    <button className="tracking-wide outline-none font-semibold"> Favourites</button>
                </Link>
                <Link to="/home" className="w-[50%] text-center hover:text-[#303f9f] outline-none">
                    <button className="tracking-wide outline-none font-semibold"> Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;

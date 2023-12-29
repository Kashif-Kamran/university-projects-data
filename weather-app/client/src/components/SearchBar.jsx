import IconRepo from "../assets/Icons";
import { fetchWeatherByCityName } from "../features/WeatherSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const SearchBar = () =>
{
    const searchInputBox = useRef(null);
    const dispatch = useDispatch();
    async function onSearchButtonClick()
    {
        console.log("Button Cliked")
        const cityName = searchInputBox.current.value;
        if (!cityName)
        {
            alert("Please Enter City Name");
            return;
        }
        dispatch(fetchWeatherByCityName(cityName)).then((data) =>
        {
            // if error
            if (data.error)
            {
                alert(data.error.message);
                return;
            }
        })

    }

    return (
        <div className="flex rounded-full overflow-hidden w-[40%]">
            <input ref={searchInputBox} className="bg-slate-600 w-[90%] py-2 px-6 text-white font-semibold tracking-wider outline-none" type="text" />
            <button className="bg-[#303f9f] px-4 text-white hover:bg-[#1a237e] transition-all duration-300 "><IconRepo iconCode={"search"} onClick={onSearchButtonClick} className={"w-6 h-6"} color={"currentColor"} boldness={2} /></button>
        </div>
    );
}

export default SearchBar;

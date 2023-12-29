import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchCurrentLocationWeather } from './features/WeatherSlice';
import { useSelector } from "react-redux";
const Layout = () =>
{
    const currentWeather = useSelector((state) => state.weather);

    const dispatch = useDispatch();
    useEffect(() =>
    {
        dispatch(fetchCurrentLocationWeather());
    },[]);

    function handleError()
    {
        if (currentWeather.loading)
        {
            return (
                <h1 className="text-2rem text-white"> Loading Data ...</h1>
            )
        }
        else if (currentWeather.error)
        {
            return (
                <h1 className="text-2rem text-white"> Unknow Error Occured</h1>
            )
        }
        else
        {
            return (
                <Outlet />
            )
        }
    }

    return (
        <div className='bg-[#37474f] h-screen flex flex-col items-center justify-center gap-8 pb-10'>
            <Navbar />
            {handleError()}
        </div>
    );
}

export default Layout;

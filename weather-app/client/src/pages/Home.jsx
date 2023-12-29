import IconRepo from '../assets/Icons';
import bgImage from '../assets/1.jpg'
import { useSelector } from 'react-redux';

import "./Home.css"
const Home = () =>
{
    const currentWeather = useSelector(store => store.weather.currentWeather)
    const forcast = useSelector(store => store.weather.forcast)
    if (currentWeather && forcast)
        return (
            <div className="h-[450px] bg-[#232931] text-white rounded-xl">
                <div
                    style={{ backgroundImage: `url(${bgImage})`,backgroundSize: 'cover',backgroundPosition: 'center' }}
                    className="left-container "
                > {/* Place Background Image Here*/}

                    <div className="left-container-bg" ></div>
                    {/* background:linerar-gradient(135deg, #5c6bc0 10%, #0d47a1 ) */}
                    <div className='today-info'>
                        <h2 className="day-title" >{currentWeather.dateAndTime.day}</h2>
                        <span className='date'>{currentWeather.dateAndTime.date}</span>
                        <div className='location'>
                            <IconRepo iconCode="location" className="w-5 h-5" color="currentColor" boldness="1.5" />
                            <span>{currentWeather.name}</span>
                        </div>
                    </div>
                    <div className="absolute flex flex-col bottom-4 left-4 items-start">
                        <IconRepo iconCode={currentWeather.weather[0].icon} className="w-16 h-16" color="currentColor" boldness="2" />
                        <h1 className='text-[3rem] font-bold'> {currentWeather.main.temp}°C</h1>
                        <h3 className='text-[1.3rem] font-semibold '>{currentWeather.weather[0].description}</h3>
                    </div>

                </div>
                <div className="right-container">
                    <div className="env-details">
                        <div>
                            <span className='title'>REAL FEEL</span>
                            <span className='value'> {currentWeather.main.feels_like}°C</span>
                        </div>
                        <div>
                            <span className='title' >HUMIDITY</span>
                            <span className='value'> {currentWeather.main.humidity} %</span>
                        </div>
                        <div>
                            <span className='title'>WIND SPEED</span>
                            <span className='value'> {currentWeather.windSpeed} mi/h</span>
                        </div>
                    </div>
                    <ul className="days-list">
                        {forcast.map((day,index) =>
                        {
                            return (
                                <li key={index} className='day'>
                                    <IconRepo iconCode={day.icon} className="w-10 h-10" color="currentColor" boldness={2} />
                                    <span className=''>{day.Day.slice(0,3)}</span>
                                    <span className=''>{day.Average}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='flex justify-center items-center'>
                        <button className='outline-none w-[60%] py-2 border-none font-bold text-[1.2rem] tracking-wider rounded-full bg-[#303f9f] hover:bg-[#1a237e] transition-all duration-300'> Favourite </button>
                    </div>
                </div>
            </div>
        );
}

export default Home;

/*

<li className='day'>
                            <IconRepo iconCode={"11d"} className="w-8 h-8" color="currentColor" boldness={2} />
                            <span className='day-title'>Sun</span>
                            <span className='temperature'>32 °C</span>
                        </li>
                        <li className='day'>
                            <IconRepo iconCode={"09d"} className="w-8 h-8" color="currentColor" boldness={2} />
                            <span className='day-title'>Mon</span>
                            <span className='temperature'>32 °C</span>
                        </li>
                        <li className='day'>
                            <IconRepo iconCode={"10d"} className="w-8 h-8" color="currentColor" boldness={2} />
                            <span className='day-title'>Tue</span>
                            <span className='temperature'>32 °C</span>
                        </li>
*/
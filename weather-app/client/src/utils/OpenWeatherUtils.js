import axios from 'axios';

const OPENWEATHER_API_KEY = '530ae3ef2569f2d6f144f6e5ef8b83ea';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORCAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast'
// Function To Get Weather At Location
export const getWeatherAtLocation = async (latitude,longitude) =>
{
    try
    {
        console.log("Longitude : ",longitude.toFixed(3),
            "Latitude : ",latitude.toFixed(3));
        const response = await axios.get(WEATHER_API_URL,{
            params: {
                lat: latitude.toFixed(2),
                lon: longitude.toFixed(2),
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Use 'metric' for Celsius, 'imperial' for Fahrenheit
            },
        });
        return response.data;
    }
    catch (error)
    {
        console.log(error)
        throw new Error("Error: Occured While Fetching Weather");
    }
};
// Function to get Daily Forcast
export const getDailyForcast = async (latitude,longitude) =>
{
    try
    {
        const response = await axios.get(FORCAST_API_URL,{
            params: {
                lat: latitude.toFixed(2),
                lon: longitude.toFixed(2),
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Use 'metric' for Celsius, 'imperial' for Fahrenheit
            }
        });
        return response.data;
    }
    catch (error)
    {
        throw new Error("Error: Occured While Fetching Forcast");
    }
}

// Function to get Weather By City Name
export const getWeatherByCityName = async (cityName) =>
{
    try
    {
        const response = await axios.get(WEATHER_API_URL,{
            params: {
                q: cityName,
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Use 'metric' for Celsius, 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error)
    {
        throw new Error(String(error.response.data.message));
    }
}


export const getForcastByCityName = async (cityName) =>
{
    try
    {
        const response = await axios.get(FORCAST_API_URL,{
            params: {
                q: cityName,
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // Use 'metric' for Celsius, 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error)
    {
        throw new Error(String(error.response.data.message));
    }
}
// There Should be Only Two Functions
// data by location
// data by city name

// export const getWeatherByCityName = async (cityName) =>
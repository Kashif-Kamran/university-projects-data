import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherAtLocation,getWeatherByCityName,getDailyForcast,getForcastByCityName } from '../utils/OpenWeatherUtils';
import { formatDateAndDayWithTimeDiff } from '../utils/DateUtils';
import { forcastDataReducer } from "../utils/WeatherForcastReducer"

// Function to get Location of the device
export const getCurrentLocation = () =>
{
    return new Promise((resolve,reject) =>
    {
        navigator.geolocation.getCurrentPosition(
            (position) =>
            {
                const { latitude,longitude } = position.coords;
                resolve({ latitude,longitude });
            },
            (error) =>
            {
                console.log("Location Error : ",error);
                reject(new Error("Unable to get the location"));
            }
        );
    });
};
// Async thunk to fetch weather data for the user's current location
export const fetchCurrentLocationWeather = createAsyncThunk(
    'weather/fetchCurrentLocationWeather',
    async () =>
    {
        try
        {
            // Run getCurrentLocation to get the position
            const position = await getCurrentLocation();
            // Run getWeatherAtLocation and getDailyForcast concurrently
            const [response,forcastApiResponse] = await Promise.all([
                getWeatherAtLocation(position.latitude,position.longitude),
                getDailyForcast(position.latitude,position.longitude)
            ]);

            // Process the results of the asynchronous operations
            const forcast = await forcastDataReducer(forcastApiResponse);

            const { coord,weather,main,wind,name,dt } = response;
            const dateAndTime = formatDateAndDayWithTimeDiff(dt);
            const currentWeather = { coord,weather,main,windSpeed: wind.speed,name,dt,dateAndTime };

            return { currentWeather,forcast };
        } catch (error)
        {
            throw new Error(error.message);
        }
    }
);


export const fetchWeatherByCityName = createAsyncThunk(
    'weather/fetchWeatherByCityName',
    async (cityName) =>
    {
        try
        {

            const [response,forcastApiResponse] = await Promise.all([getWeatherByCityName(cityName),getForcastByCityName(cityName)]);
            const forcast = await forcastDataReducer(forcastApiResponse);

            const { coord,weather,main,wind,name,dt } = response;
            const dateAndTime = formatDateAndDayWithTimeDiff(dt);
            const currentWeather = { coord,weather,main,windSpeed: wind.speed,name,dt,dateAndTime };

            return { currentWeather,forcast };
        }
        catch (error)
        {
            throw new Error(error.message);
        }
    });

export const fetchWeatherByLocation = createAsyncThunk(
    'weather/fetchingWeatherByLocation',
    async (location) =>
    {
        try
        {
            const response = await getWeatherAtLocation(location.lat,location.lng);
            let { coord,weather,main,wind,name,dt } = response;
            if (location.cityName)
                name = location.cityName;

            return { coord,weather,main,windSpeed: wind.speed,name,dt };
        }
        catch (error)
        {
            throw new Error(error.message);
        }
    });


const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentWeather: null,
        forcast: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers:
    {
        // Fetch Current Location Weather
        [fetchCurrentLocationWeather.pending]: (state) =>
        {
            state.loading = true;
            state.error = null;
        }
        ,
        [fetchCurrentLocationWeather.fulfilled]: (state,action) =>
        {
            state.loading = false;
            state.error = null;
            state.currentWeather = action.payload.currentWeather;
            state.forcast = action.payload.forcast;
        }
        ,
        [fetchCurrentLocationWeather.rejected]: (state,action) =>
        {
            state.loading = false;

            state.error = action.error.message;
            console.log(action.error.message)
        }
        // Fetch Weather By City Name
        ,
        [fetchWeatherByCityName.pending]: (state) =>
        {
            state.loading = true;
            state.error = null;
        }
        ,
        [fetchWeatherByCityName.fulfilled]: (state,action) =>
        {
            state.loading = false;
            state.error = null;
            state.currentWeather = action.payload.currentWeather;
            state.forcast = action.payload.forcast;
        }
        ,
        [fetchWeatherByCityName.rejected]: (state,action) =>
        {
            state.loading = false;
            state.error = action.error.message;
        }
        // Fetch Weather By Location
        ,
        [fetchWeatherByLocation.pending]: (state) =>
        {
            state.loading = true;
            state.error = null;
        }
        ,
        [fetchWeatherByLocation.fulfilled]: (state,action) =>
        {
            state.loading = false;
            state.error = null;
            state.currentWeather = action.payload;
        }
        ,
        [fetchWeatherByLocation.rejected]: (state,action) =>
        {
            state.loading = false;
            state.error = action.error.message;
        }
    },
});

export default weatherSlice.reducer;


/*
{
    coords:{
        logitude
        latitude
    }
    dateAndTime:{
        day: 
        date: 
        timediff: 
    }
    weather:{
        temperature:
        feelsLike:
        minTemp:
        maxTemp
        humidity:
        pressure:


    }
}
*/
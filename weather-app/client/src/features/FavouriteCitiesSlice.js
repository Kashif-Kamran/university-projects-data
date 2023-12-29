import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { getCitiesFromLocalStorage,addCity,removeCityByName,removeCityByIndex } from "../utils/CitiesLocalStorage"

const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        citiesList: getCitiesFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        addNewCity: (state,action) =>
        {
            const { cityName,latitude,longitute } = action.payload;
            addCity(cityName,latitude,longitute);
            state.citiesList = getCitiesFromLocalStorage();
        },
        removeCity: (state,action) =>
        {
            const cityName = action.payload;
            removeCityByName(cityName);
            state.citiesList = getCitiesFromLocalStorage();
        }
    },
    extraReducers: {
    }
});


export default citiesSlice.reducer;
export const { addNewCity,removeCity } = citiesSlice.actions;
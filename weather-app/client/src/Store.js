import { configureStore } from "@reduxjs/toolkit"
import authenticationSliceReducer from "./features/AuthenticationSlice";
import weatherSlice from "./features/WeatherSlice";
import FavouriteCitiesSlice from "./features/FavouriteCitiesSlice";
export const store = configureStore({
    reducer: {
        authentication: authenticationSliceReducer,
        weather: weatherSlice,
        favouriteCities: FavouriteCitiesSlice,
    }
});



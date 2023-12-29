function getDayOfWeek(timestamp)
{
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date(timestamp * 1000);
    const dayOfWeek = dateObj.getDay();
    return daysOfWeek[dayOfWeek];
}

// Function to process the API response and get min and max temperatures based on the day
export const forcastDataReducer = async (data) =>
{
    const days = {};

    data.list.forEach((item) =>
    {
        const currentDate = new Date();
        const forecastDate = new Date(item.dt * 1000);
        const isToday = forecastDate.getDate() === currentDate.getDate() &&
            forecastDate.getMonth() === currentDate.getMonth() &&
            forecastDate.getFullYear() === currentDate.getFullYear();

        if (!isToday)
        {
            const day = getDayOfWeek(item.dt);
            if (!days[day])
            {
                days[day] = {
                    day: day,
                    temperatures: [],
                    icons: [],
                };
            }

            days[day].temperatures.push(item.main.temp);
            days[day].icons.push(item.weather[0].icon);
        }
    });

    const output = Object.values(days).map((dayData) =>
    {
        const minTemp = Math.min(...dayData.temperatures);
        const maxTemp = Math.max(...dayData.temperatures);
        const avgTemp = (minTemp + maxTemp) / 2;

        return {
            Day: dayData.day,
            Average: avgTemp.toFixed(2),
            minTemp: minTemp.toFixed(2),
            maxTemp: maxTemp.toFixed(2),
            icon: dayData.icons[0], // Assuming that all data for a day have the same icon, you can modify this based on your actual data
        };
    });

    return output;
}

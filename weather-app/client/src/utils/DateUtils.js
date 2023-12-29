export const formatDateAndDayWithTimeDiff = (timestamp) =>
{
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const dateObj = new Date(timestamp * 1000);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    // Calculate the time difference
    const currentTime = new Date();
    const timeDiffInSeconds = Math.floor((currentTime - dateObj) / 1000);

    if (timeDiffInSeconds < 60)
    {
        return {
            day: dayOfWeek,
            date: formattedDate,
            timediff: "now"
        };
    } else if (timeDiffInSeconds < 3600)
    {
        const minutesAgo = Math.floor(timeDiffInSeconds / 60);
        return {
            day: dayOfWeek,
            date: formattedDate,
            timediff: `${minutesAgo} min ago`
        };
    } else if (timeDiffInSeconds < 86400)
    {
        const hoursAgo = Math.floor(timeDiffInSeconds / 3600);
        return {
            day: dayOfWeek,
            date: formattedDate,
            timediff: `${hoursAgo} hour ago`
        };
    } else
    {
        const daysAgo = Math.floor(timeDiffInSeconds / 86400);
        return {
            day: dayOfWeek,
            date: formattedDate,
            timediff: `${daysAgo} day ago`
        };
    }
}

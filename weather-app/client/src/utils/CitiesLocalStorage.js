
// Function to get the cities from local storage
function getCitiesFromLocalStorage()
{
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    return cities;
}

// Function to save the cities to local storage
function saveCitiesToLocalStorage(cities)
{
    localStorage.setItem('cities',JSON.stringify(cities));
}

// Function to add a city to the list
function addCity(name,longitude,latitude)
{
    const cities = getCitiesFromLocalStorage();

    // Check if the city with the given name already exists
    const existingCity = cities.find(city => city.name === name);

    if (!existingCity)
    {
        // If the city doesn't exist, add it to the list
        const newCity = { name,longitude,latitude };
        cities.push(newCity);
        saveCitiesToLocalStorage(cities);
    } else
    {
        // If the city already exists, you can choose to handle it as per your application's requirement.
        // For example, you could show an error message or do nothing.
        console.log('City already exists.');
    }
}

// Function to remove a city from the list by name
function removeCityByName(name)
{
    const cities = getCitiesFromLocalStorage();
    const updatedCities = cities.filter(city => city.name !== name);
    saveCitiesToLocalStorage(updatedCities);

}

// Function to remove a city from the list by index
function removeCityByIndex(index)
{
    const cities = getCitiesFromLocalStorage();
    cities.splice(index,1);
    saveCitiesToLocalStorage(cities);
}


export { getCitiesFromLocalStorage,addCity,removeCityByName,removeCityByIndex };
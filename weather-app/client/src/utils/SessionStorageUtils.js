// Function to add token into session storage
export const addTokenToSessionStorage = (token) =>
{
    sessionStorage.setItem("token",token);
}
// Function to get token from session storage
export const getTokenFromSessionStorage = () =>
{
    return sessionStorage.getItem("token");
}
// Function to remove token from session storage
export const removeTokenFromSessionStorage = () =>
{
    sessionStorage.removeItem("token");
}

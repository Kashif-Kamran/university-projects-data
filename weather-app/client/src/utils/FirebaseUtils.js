import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

// Function to Register In Firebase
export const firebaseRegister = async (email,password) =>
{
    const auth = getAuth();
    try
    {
        const response = await createUserWithEmailAndPassword(auth,email,password);
        return response;
    }
    catch (error)
    {

        if (error.code === "auth/email-already-in-use")
        {
            throw new Error("Email Already In Use");
        }
        throw new Error("Registeration Error: ","Un-Expected Error Occured");
    }
}

// Function to Login In Firebase
export const firebaseLogin = async (email,password) =>
{
    const auth = getAuth();
    try
    {
        const response = await signInWithEmailAndPassword(auth,email,password);
        return response;
    }
    catch (error)
    {
        if (error.code === "auth/user-not-found")
        {
            throw new Error("SignIn Error: User Not Found");
        }
        else if (error.code === "auth/wrong-password")
        {
            throw new Error("SignIn Error: Wrong Password");
        }
        else if (error.code === "auth/too-many-requests")
        {
            throw new Error("Koi itna galat kasy ho sakta hai bay.");
        }
        console.log("Login Error : ",error)
        throw new Error("SignIn Error",error.message);
    }
}

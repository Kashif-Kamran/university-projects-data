import { Link,useNavigate } from "react-router-dom";
import { useRef } from "react";
import loginValidation from "../validations/LoginValidation"
import { useDispatch } from "react-redux";
import { loginAsyncThunk } from "../features/AuthenticationSlice";
const Login = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    function handleLogin()
    {
        // Extracting Inputs from
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // Validation of Inputs
        const { error } = loginValidation({ email,password });
        if (error)
        {
            alert(error.details[0].message);
            return;
        }
        dispatch(loginAsyncThunk({ email,password }))
            .then((response) =>
            {
                if (response.error)
                {
                    alert(response.error.message.toString());
                }
                else
                {
                    alert("Login Successfull");
                    navigate("/favourites");

                }
            });

    }

    return (
        <div className="h-[450px] w-[600px] bg-[#232931] rounded-xl relative overflow-hidden">
            <h1 className="text-[2.5rem] text-center my-8  mb-16 text-white font-semibold tracking-wider">Login</h1>
            {/* <div className="w-[60%] my-10 mx-auto border-2 border-slate-500 rounded-full"></div> */}
            <div className="flex flex-col px-12 gap-4">
                <input ref={emailRef} className="py-3 px-6 outline-none bg-slate-500 rounded-full text-[1.1rem] text-white font-semibold tracking-wider" type="text" autoComplete="false" placeholder="Enter Username" />
                <input ref={passwordRef} className="py-3 px-6 outline-none bg-slate-500 rounded-full text-[1.1rem] text-white font-semibold tracking-wider" type="password" autoComplete="false" placeholder="Enter Passwords" />
            </div>
            <div className="my-2 flex items-center justify-around ">
                <Link className="w-[30%]" to="/signup">
                    <button className="w-[100%] my-4 text-white outline-none border-none font-bold text-[1.2rem] tracking-wider bg-[#303f9f] hover:bg-[#1a237e] transition-all duration-300  py-2 rounded-full border-2">SignUp</button>
                </Link>
                <button className="w-[30%] my-4 text-white outline-none border-none font-bold text-[1.2rem] tracking-wider bg-[#303f9f] hover:bg-[#1a237e] transition-all duration-300  py-2 rounded-full border-2" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;

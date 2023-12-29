import { useRef } from "react";
import signupValidation from "../validations/SignUpValidation";
import { registerAsyncThunk } from "../features/AuthenticationSlice";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
const Login = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


    function handleSignup()
    {
        // Extracting Inputs from
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        // Validation of Inputs
        const { error } = signupValidation({ email,password,confirmPassword });
        if (error)
        {
            alert(error.details[0].message);
            return;
        }
        // Dispatching Register Async Thunk
        dispatch(registerAsyncThunk({ email,password }))
            .then((response) =>
            {
                if (response.error)
                {
                    alert(response.error.message);
                }
                else
                {
                    console.log(response.payload);
                    alert("Registeration Successfull");
                    navigate("/login");
                }
            });

    }
    return (

        <div className="h-[450px] w-[600px] bg-[#232931] rounded-xl overflow-hidden">
            <h1 className="text-[2.5rem] text-center my-6  mb-12 text-white font-semibold tracking-wider">SignUp</h1>
            {/* <div className="w-[60%] my-10 mx-auto border-2 border-slate-500 rounded-full"></div> */}
            <div className="flex flex-col px-12 gap-4">
                <input className="py-3 px-6 outline-none bg-slate-500 rounded-full text-[1.1rem] text-white font-semibold tracking-wider" ref={emailRef} type="text" autoComplete="false" placeholder="Enter Username" />
                <input className="py-3 px-6 outline-none bg-slate-500 rounded-full text-[1.1rem] text-white font-semibold tracking-wider" ref={passwordRef} type="password" autoComplete="false" placeholder="Enter Passwords" />
                <input className="py-3 px-6 outline-none bg-slate-500 rounded-full text-[1.1rem] text-white font-semibold tracking-wider" ref={confirmPasswordRef} type="password" autoComplete="false" placeholder="Enter Passwords" />
            </div>
            <div className="my-2 flex items-center justify-around ">
                <button className="w-[30%] my-4 text-white outline-none border-none font-bold text-[1.2rem] tracking-wider bg-[#303f9f] hover:bg-[#1a237e] transition-all duration-300  py-2 rounded-full border-2" onClick={handleSignup}>SignUp</button>
                <Link className="w-[30%]" to="/login">
                    <button className="w-[100%] my-4 text-white outline-none border-none font-bold text-[1.2rem] tracking-wider bg-[#303f9f] hover:bg-[#1a237e] transition-all duration-300  py-2 rounded-full border-2">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;

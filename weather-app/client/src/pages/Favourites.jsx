import IconRepo from "../assets/Icons";

const Favourites = () =>
{
    return (
        <div className="h-[450px] w-[600px] bg-[#232931] text-white rounded-xl p-4 px-14">
            <h1 className="text-[2rem] text-center font-semibold">Favourites</h1>
            <div className="border my-4 rounded-full"></div>

            <div className="border border-slate-400 h-12 flex items-center rounded-full px-6 mb-4">
                <h1 className="w-44 text-[1.2rem] font-semibold">Islamabad</h1>
                <div className="w-20">
                    <IconRepo iconCode={"01d"} className="h-8 opacity-70" color="currentColor" boldness="2" />
                </div>
                <h1 className="text-[1rem] w-36 opacity-70">1 min ago</h1>
                <button className="">
                    <IconRepo iconCode={"liked-heart"} className="h-[30px] opacity-70 " color="red" boldness="2" />
                </button>
            </div>



        </div>
    );
}

export default Favourites;

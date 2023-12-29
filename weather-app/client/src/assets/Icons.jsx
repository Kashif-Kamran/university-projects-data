const weatherIcons = {
    // 
    "01d": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </>,
    "01n": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </>,
    // 
    "02d": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"></path>
    </>,
    "02n": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"></path>
    </>,
    // 
    "03d": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M7 7v10"></path>
        <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
        <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M21 7v10"></path>
    </>,
    "03n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M7 7v10"></path>
        <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
        <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M21 7v10"></path>
    </>,
    // 
    "04d": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M7 7v10"></path>
        <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
        <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M21 7v10"></path>
    </>,
    "04n": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M7 7v10"></path>
        <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
        <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M21 7v10"></path>
    </>,
    // 
    "09d": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01"></path>
    </>,
    "09n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01"></path>
    </>,
    // 
    "10d": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 13v2m0 3v2m4 -5v2m0 3v2"></path>
    </>,
    "10n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 13v2m0 3v2m4 -5v2m0 3v2"></path>
    </>,
    // 
    "11d": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
        <path d="M13 14l-2 4l3 0l-2 4"></path>
    </>,
    "11n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
        <path d="M13 14l-2 4l3 0l-2 4"></path>
    </>,
    // 
    "13d": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01"></path>
    </>,
    "13n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"></path>
        <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01"></path>
    </>,
    // 
    "50d": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 12h1"></path>
        <path d="M12 3v1"></path>
        <path d="M20 12h1"></path>
        <path d="M5.6 5.6l.7 .7"></path>
        <path d="M18.4 5.6l-.7 .7"></path>
        <path d="M8 12a4 4 0 1 1 8 0"></path>
        <path d="M3 16h18"></path>
        <path d="M3 20h18"></path>
    </>,
    "50n": < >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 16h18"></path>
        <path d="M3 20h18"></path>
        <path d="M8.296 16c-2.268 -1.4 -3.598 -4.087 -3.237 -6.916c.443 -3.48 3.308 -6.083 6.698 -6.084v.006h.296c-1.991 1.916 -2.377 5.03 -.918 7.405c1.459 2.374 4.346 3.33 6.865 2.275a6.888 6.888 0 0 1 -2.777 3.314"></path>
    </>,
    "404": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M7 7v10"></path>
        <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
        <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
        <path d="M21 7v10"></path>
    </>,
    "location": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" strokeWidth="0" fill="currentColor"></path>
    </>
    ,
    "extra": <>
        <style>{`@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
        <rect width="16" height="16" x="4" y="4" stroke="#0A0A30" strokeWidth="1.5" rx="8" />
        <path stroke="#0A0A30" strokeLinecap="round" strokeWidth="1.5" d="M12.021 12l2.325 2.325" />
        <path
            stroke="#265BFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12.021 12V6.84"
            style={{ animation: "rotate 2s linear infinite both",transformOrigin: "center" }}
        />
    </>
    ,
    "search": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
        <path d="M21 21l-6 -6"></path>
    </>,
    "liked-heart": <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
    </>,
    "loading": <>
        <h1 className="text-[2rem] text-white" >Loading</h1>
    </>
}
// ---  

// eslint-disable-next-line react/prop-types
const IconRepo = ({ iconCode,className,color,boldness,...rest }) =>
{
    const notFoundIcon = weatherIcons["404"].props.children;
    const icon = weatherIcons[iconCode] ? weatherIcons[iconCode].props.children : notFoundIcon;
    return (
        <svg className={`inline-block ${className}`} strokeWidth={boldness} {...rest} viewBox="0 0 24 24" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {icon}
        </svg>
    );
}

export default IconRepo;


// <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
//   viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">

// </svg>



// <svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="194px" height="194px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
//     <path fill="none" stroke="#e90c59" strokeWidth="8" strokeasharray="148.82157836914064 107.76734985351561" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.9500000000000001);transform-origin:50px 50px">
//         <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.7857142857142856s" keyTimes="0;1" values="0;256.58892822265625"></animate>
//     </path>
// </svg>
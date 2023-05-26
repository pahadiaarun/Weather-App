import React, {useState, useEffect} from 'react';

//import axios
import axios from 'axios';

//import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzle,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsGithub,
} from 'react-icons/bs';

import {
  TbTemperatureCelsius
} from 'react-icons/tb';

import { 
  ImSpinner8
} from 'react-icons/im';

//API key
const API_KEY = '4ebc7fde2d973bbdd422cfe246d32958';

const App = () => {
  const [data, setDate] = useState(null);
  const [location, setLocation] = useState('Delhi,In');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    //if input value is not empty
    if (inputValue.length > 0) {
      //get weather data
      setLocation(inputValue);
      }

      //select imput
      const input = document.querySelector('input');

      // if input value is empty
      if (input.length === 0) {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
          }, 500);
      }

      //clear input
      input.value = '';

    //Prevent Default
    e.preventDefault();
  }

  //fetch the data
  useEffect(() => {
    //set loading to true
    setLoading(true);

    const url = ` https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY} `;

    axios.get(url).then(res =>{
      setTimeout(() => {
        setDate(res.data);
        setLoading(false);
      },1500)
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    });
  }, [location]);

  //Error Message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    },2000)
    //cleat timer
    return () => {
      clearTimeout(timer);
    }
  },[errorMsg])  
  //if data is false show the loader

  if(!data){
    return(
      <div className='w-full h-screen bg-containerBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    )
  }

  //set the icons according to the weather
  let icon;

  switch(data.weather[0].main){
    case 'Clouds':
      icon = < IoMdCloudy />
      break;
    case 'Rain':
      icon = < IoMdRainy className='text-[#31cafb]' />
      break;
    case 'Snow':
      icon = < IoMdSnow className='text-[#31cafb]'/>
      break;
    case 'Drizzle':
      icon = < BsCloudDrizzle className='text-[#31cafb]' />
      break;
    case 'Clear':
      icon = < IoMdSunny className='text-[#ffde33]'/>
      break;
    case 'Thunderstorm':
      icon = < IoMdThunderstorm className='text-[#bd7f56]' />
      break;
    case 'Haze':
      icon = < BsCloudHaze2Fill className='text-[#bd7f56]' />
      break;
    case 'Mist':
      icon = < BsCloudHaze2Fill className='text-[#bd7f56]' />
      break;
    default:
      break;
  }
//date object
const date = new Date();


  return (
    <div className={`w-full h-screen bg-gray-800 flex flex-col items-center justify-center px-4 lg:px-0`}>
      
      {errorMsg && <div className='w-full max-w-[100vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'> {`${errorMsg.response.data.message}`} </div>}
      {/* form */}
        <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
          <div className='h-full relative flex items-center justify-between p-2'>
            <input onChange={(e) => {handleInput(e)}} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by city or country' />
            <button onClick={(e) => handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'>
              <IoMdSearch className='text-2xl text-white' />
            </button>
          </div>
        </form>
      {/* card */}
      <div className='w-full bg-containerBg bg-cover bg-center max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {loading ? (<div className='w-full h-full flex justify-center items-center'>
          <ImSpinner8 className='text-white text-5xl animate-spin'/>
        </div>) : (
        <div>
          {/* card top */}
          <div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-5'>
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
              <div className='text-2xl font-semibold'>
                {data.name}, {data.sys.country}

                {/* data */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                </div>
              </div>
              </div>
          </div>
            <div className='text-3xl flex items-center gap-x-2'>
              <a href="https://github.com/pahadiaarun/Weather-App"><BsGithub className='text-white hover:text-[#2d95bd]' /></a>
            </div>
          </div>
          </div>
          {/* card body */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/* temperature */}
              <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}
              </div>
              {/* celsius icon */}
              <div className='text-4xl'>
                <TbTemperatureCelsius/>
              </div>
            </div>
            {/* weather description */}
            <div className='capitalize text-[24px] font-light text-center'>{data.weather[0].description}</div>
          </div>
          {/* card bottom */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap=-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsEye/> 
                </div>
                <div>
                  {/* visibility */}

                  <div>
                  Visibility <span className='ml-2'>{data.visibility/1000} km</span>
                </div>
                </div>
              </div>
              <div className='flex items-center gap=-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsThermometer/>
                </div>
                <div className='flex'>
                  Feels like <div className='flex ml-2'>{data.main.feels_like}
            <TbTemperatureCelsius/> 
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap=-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWater/> 
                </div>
                <div>
                  {/* Humidity */}
                  <div> Humidity <span className='ml-2'>{data.main.humidity} %</span>
                </div>
                </div>
              </div>
              <div className='flex items-center gap=-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div>
                  {/* Wind */}
                  Wind <span className='ml-2'>{data.wind.speed} m/s 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default App;

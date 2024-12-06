import React from "react";
import { images } from "../../../assets/images";
import { Link } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
const Home = () => {
  return (
    <div>
      <div className="h-screen w-screen realtive flex justify-end">
        <img src={images.map} className="w-full h-full md:w-[75%]"></img>
        <div className="absolute top-10 flex flex-col md:flex-row  justify-between items-center p-6">
          <div className="w-full md:w-2/5 md:h-full h-fit">
            <h1 className="font-extrabold  text-4xl lg:text-5xl xl:text-7xl archivo-black-regular">
              Skilled Help,
              <br />
              <span className="text-neutral-600">Just An Hour Away !</span>
            </h1>
            <p className="text-sm mt-8 ">
              From fixing faucets to fixing meals, we’ve got you covered. Why
              stress over doing it yourself when an expert is just an hour away?
              We’re here for you, hour by hour and click by click, ensuring that
              your time is spent on what matters most. Whether it’s cleaning,
              cooking, or tackling any household task, let us handle the rest.
              With effortless booking and expert solutions, we make life easier.
            </p>
            <button className="bg-slate-900 text-white px-3 rounded-full mt-6 py-1 hover:scale-110 duration-700">
              <Link to="/account">
              Explore Services
              </Link>
             
            </button>
          </div>
          <div className="w-full md:w-3/5 h-[50vh] md:h-full grid grid-cols-2 gap-y-8 items-center justify-items-center">
            <img
              src={images.chef}
              alt="Chef"
              className=" row-span-2 rounded-[20px] hover:scale-105 duration-700 w-[80%] h-fit md:h-[75vh] object-cover"
            />
            <img
              src={images.maid}
              alt="Maid"
              className="rounded-[20px] hover:scale-105 duration-700 w-[80%] h-fit md:h-[40vh] object-cover"
            />
            <img
              src={images.plumber}
              alt="Plumber"
              className="rounded-[20px] hover:scale-105 duration-700 w-[80%] h-fit md:h-[40vh] object-cover"
            />
          </div>
        </div>
      </div>

      <section className="h-screen p-4">
        <h1 className="text-2xl md:text-3xl lg:text-5xl archivo-black-regular ">
          Our Top Services{" "}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 gap-10 sm:grid-cols-2  ">
          <div className="text-center flex flex-col items-center ">
            <img
              src={images.chef2}
              className="w-[100%] h-[70%] object-cover rounded-[16px] hover:scale-105 duration-700"
            ></img>
            <p className="font-bold">Chef</p>
            <p className="text-sm text-slate-600">
              Need a meal on the fly? Call an hourly chef!
            </p>
            <button className="text-sm bg-slate-900 text-white rounded-full hover:scale-110 duration-700 px-6 py-0.5 mt-2">
              Explore
            </button>
          </div>

          <div className="text-center flex flex-col items-center">
            <img
              src={images.helper}
              className="w-[100%] h-[70%] object-cover rounded-[16px] hover:scale-105 duration-700"
            ></img>
            <p className="font-bold">Helper</p>
            <p className="text-sm text-slate-600">
              Because a clean house is a happy house.
            </p>
            <button className="text-sm bg-slate-900 text-white rounded-full hover:scale-110 duration-700 px-6 py-0.5 mt-2">
              Explore
            </button>
          </div>

          <div className="text-center flex flex-col items-center">
            <img
              src={images.electrician2}
              className="w-[100%] h-[70%] object-cover rounded-[16px] hover:scale-105 duration-700"
            ></img>
            <p className="font-bold">Electrician</p>
            <p className="text-sm text-slate-600">
              Power up with the best electricians, booked hourly.
            </p>
            <button className="text-sm bg-slate-900 text-white rounded-full hover:scale-110 duration-700 px-6 py-0.5 mt-2">
              Explore
            </button>
          </div>

          <div className="text-center flex flex-col items-center">
            <img
              src={images.plumber2}
              className="w-[100%] h-[70%] object-cover rounded-[16px] hover:scale-105 duration-700"
            ></img>
            <p className="font-bold">Plumber</p>
            <p className="text-sm text-slate-600">
              From drips to clogs, we’re here to help—hour by hour.
            </p>
            <button className="text-sm bg-slate-900 text-white rounded-full hover:scale-110 duration-700 px-6 py-0.5 mt-2">
              Explore
            </button>
          </div>
        </div>
      </section>

      <section className="h-screen p-4">
        <h1 className="text-2xl md:text-3xl lg:text-5xl archivo-black-regular ">
          Latest reviews
        </h1>
        <div className="flex flex-col md:flex-row  justify-between">
          <div className="basis-1/2 p-4">
            <div className="relative h-[60%] w-full mb-2 group hover:scale-105 duration-700">
              <img
                src={images.maid}
                alt="Maid"
                className="h-full w-full rounded-[20px] object-cover "
              />
              <div className=" h-full w-full bg-black absolute group-hover:block rounded-[20px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-48 hidden flex text-center">
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"2rem"}}/> 
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"2rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"2rem"}}/> 
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"2rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"2rem"}}/>
              </div>
            </div>
            <h1 className="font-bold">@ lorem ispum</h1>
            <p className="text-sm text-justify">
              lorem ispumn comment of this rating wnncsdkc dcsdc Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Excepturi
              necessitatibus assumenda placeat ipsam veritatis ad reiciendis
              veniam error. Laborum omnis nihil magni consequatur recusandae
              repudiandae similique corporis sit odit perspiciatis!
            </p>
          </div>
          <div className="basis-1/2 m-4">
            <ul>
              <li className="flex"> 
                <div className="relative h-40 w-full mb-2 group hover:scale-105 duration-700">
                 

                  
              <img
                src={images.maid}
                alt="Maid"
                className="h-full w-full rounded-[20px] object-cover "
              />
              <div className=" h-full w-full bg-black absolute group-hover:block rounded-[20px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-12 hidden flex text-center">
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
              </div>
            </div>
            <div className="p-4">
            <h1 className="font-bold">@ lorem ispum</h1>
            <p className="text-sm text-justify">
              lorem ispumn comment of this rating wnncsdkc dcsdc Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Excepturi
              necessitatibus assumenda placeat ipsam veritatis ad reiciendis
              veniam error. Laborum omnis nihil magni consequatur recusandae
              repudiandae similique corporis sit odit perspiciatis!
            </p> </div>
            </li>
            <li className="flex"> 
                <div className="relative h-40 w-full mb-2 group hover:scale-105 duration-700">
                 

                  
              <img
                src={images.maid}
                alt="Maid"
                className="h-full w-full rounded-[20px] object-cover "
              />
              <div className=" h-full w-full bg-black absolute group-hover:block rounded-[20px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-12 hidden flex text-center">
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
              </div>
            </div>
            <div className="p-4">
            <h1 className="font-bold">@ lorem ispum</h1>
            <p className="text-sm text-justify ">
              lorem ispumn comment of this rating wnncsdkc dcsdc Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Excepturi
              necessitatibus assumenda placeat ipsam veritatis ad reiciendis
              veniam error. Laborum omnis nihil magni consequatur recusandae
              repudiandae similique corporis sit odit perspiciatis!
            </p> </div>
            </li>
            <li className="flex"> 
                <div className="relative h-40 w-full mb-2 group hover:scale-105 duration-700">
                 

                  
              <img
                src={images.maid}
                alt="Maid"
                className="h-full w-full rounded-[20px] object-cover "
              />
              <div className=" h-full w-full bg-black absolute group-hover:block rounded-[20px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-12 hidden flex text-center">
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/> 
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
                 <StarRateRoundedIcon sx={{color:"rgb(251 191 36)" ,fontSize:"1.3rem"}}/>
              </div>
            </div>
            <div className="p-4">
            <h1 className="font-bold">@ lorem ispum</h1>
            <p className="text-sm">
              lorem ispumn comment of this rating wnncsdkc dcsdc Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Excepturi
              necessitatibus assumenda placeat ipsam veritatis ad reiciendis
              veniam error. Laborum omnis nihil magni consequatur recusandae
              repudiandae similique corporis sit odit perspiciatis!
            </p> </div>
            </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="h-screen p-4">
      <h1 className="text-2xl md:text-3xl lg:text-5xl archivo-black-regular ">
          Be a Server
          </h1>
          
          <Stepper className="p-4 w-[90%] mx-auto mt-12">
    
          <Step className="relative group hover:scale-105 duration-700">
          <img src={images.login} className=" h-64 w-64"></img>
          <div className=" h-64 w-64 bg-black absolute group-hover:block rounded-[8px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-24 text-white font-bold hidden flex text-center">
               Login
              </div>
          </Step>
          <Step className="relative group hover:scale-105 duration-700">
          <img src={images.account} className=" h-64 w-64"></img>
          <div className=" h-64 w-64 bg-black absolute group-hover:block rounded-[8px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-24 text-white font-bold hidden flex text-center">
               Create account
              </div>
          </Step>
          <Step className="relative group hover:scale-105 duration-700">
          <img src={images.post} className=" h-64 w-64"></img>
          <div className=" h-64 w-64 bg-black absolute group-hover:block rounded-[8px] group-hover:top-0 hidden opacity-60">
              </div>
              <div className=" h-full w-full absolute group-hover:block group-hover:top-24 text-white font-bold hidden flex text-center">
               Post pictures
              </div>
          </Step>
      </Stepper>
           
       <button className="w-40 bg-black text-white py-1 rounded-full hover:scale-110 duration-700"><Link to="/createAccount">Create Account</Link></button>
      
      </section>
    </div>
  );
};

export default Home;

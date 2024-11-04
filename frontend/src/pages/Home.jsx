import React from 'react'
import food from "../assets/food.png";
import food1 from "../assets/food1.png";
const Home = () => {

  return (
    <div className='pt-24 md:px-20 px-9 '>
      <h1 className='md:text-4xl text-2xl text-white font-serif font-bold'>
        Are you hungry ?
      </h1>
      <p className='md:text-7xl text-5xl py-5 text-white font-serif font-bold'>
        Don't Wait !
      </p>
      <p className='md:text-2xl text-xl text-yellow-400 font-serif md:px-5 font-semibold'>Lets start to order food now</p>
       <button className=" mt-5 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-3 md:py-2 bg-[#fff] text-[#696969] rounded-2xl md:rounded-full transition duration-200 ease-linear text-lg font-serif font-bold">
               check out menu
      </button>

      {/* <div className='flex gap-6 py-5'>
        <img src={food} className=' md:w-[12rem] w-[6rem] rounded-full border-[3px]  ' alt="" />
        <img src={food1}  className='md:w-[12rem] w-[6rem]  rounded-full border-[3px]' alt="" />
      </div> */}
    </div>
  )
}

export default Home

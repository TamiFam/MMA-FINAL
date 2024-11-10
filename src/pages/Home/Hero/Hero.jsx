import React from 'react';
import bgImg from '../../../assets/home/4df19b036c3afca60d1dba3914f7f8e7.jpg';

const Hero = () => {
  return (
    <div className='min-h-screen ' style={{ backgroundImage: `url(${bgImg})` }}>
      <div className='min-h-screen flex justify-start pl-11  mb-2 items-end text-white bg-black bg-opacity-60'>
        <div>
          
          <div className='space-y-4 mb-5 '>
            <div className='flex-grow'>
            <p className='md:text-2xl text-xl'>We Provide</p>
            </div>
           <div className='flex-grow'>
           <h3 className='md:text-7xl text-4xl font-bold '>Best MMA Course Online</h3>
           </div>
            
            <div className='md:w-1/2'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem provident, numquam tempore aliquam quasi debitis pariatur voluptatem. Cum non vitae ipsam nisi deleniti est sequi qui, natus, sunt optio aspernatur?
              </p>
            </div>
            
            <div className='flex flex-wrap items-center gap-5'>
              <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button>
              <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
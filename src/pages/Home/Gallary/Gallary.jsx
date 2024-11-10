import React from 'react'
import image1 from '../../../assets/gallary/mma-gallery-11.jpeg'
import image2 from '../../../assets/gallary/mma-gallery-22.jpg'
import image3 from '../../../assets/gallary/mma-gallery-33.jpg'
import image4 from '../../../assets/gallary/mma-gallery-44.jpg'  
import image5 from '../../../assets/gallary/mma-global-55.jpg'
function Gallary() {
  return (
    <div className='md:w-[100%] md:h-[100%]   mx-auto my-28'>
      <div className='md-16'>
        <h1 className='text-5xl font-bold text-center  dark:text-white text-gray-800  mb-5' >Our <span className='text-secondary text-bold 5xl'> Gallery</span></h1>
      </div>
      { /*image conatiner */}
      <div className='md:grid grid-cols-2 items-center justify-center  gap-4'>
        
        <div className='mb-4 md:mb-0'>
          <img src={image1} alt=""  className='  mx-auto rounded-lg'/>
        </div>
        <div className='gap-4 grid grid-cols-2 items-start'>
          <div>
            <img src={image2} alt="" className='md:h-[444px] md:w-[555px] rounded-lg shadow-sm' />
          </div>
          <div>
            <img src={image3} alt="" className='md:h-[444px] md:w-[555px]  rounded-lg shadow-sm' />
          </div>
          <div>
            <img src={image4} alt="" className='md:h-[444px] md:w-[555px] rounded-lg shadow-sm' />
          </div>
          <div>
            <img src={image5} alt="" className='md:h-[444px] md:w-[555px] rounded-lg shadow-sm' />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Gallary
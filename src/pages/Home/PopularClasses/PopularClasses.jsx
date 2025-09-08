import React, {useEffect,useState} from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import Card from './Card'
import bgImg from '../../../assets/home/4df19b036c3afca60d1dba3914f7f8e7.jpg';
import useUser from '../../../hooks/useUser';
import { HashLoader } from 'react-spinners';

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch()
  const [classes, setClasses] = useState([])
  // const {currentUser, isLoading} = useUser()
  useEffect(() => {
    const fetchClasses = async() => {
      const response = await axiosFetch.get('/classes')
      setClasses(response.data)
      // console.log(response )  
    }
    fetchClasses()
  }, [])
  // console.log(classes)
  // if(isLoading) {
  //   return <div className='flex justify-center items-center h-screen'><HashLoader color="#f40dcf" /></div>
  // }
  return (
    <div className='w-full h-full'>
    <div className='md:w-[80%] mx-auto my-36'>
      
<div>
    <h1 className='text-5xl font-bold text-center  dark:text-white text-gray-800'>Our <span className='text-secondary'>Popular</span> Classes</h1>
    <div className='w-[40%] text-center mx-auto'>
        <p className='text-gray-500'>Explore our Popular Classes . Here is some popular classes on How many student enrollled</p>
    </div>
</div>

<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
{classes.slice(0,6).map((item) => (
  <Card
    key={item._id}
    _id={item._id}
    name={item.name} 
    image={item.image}
    availableSeats={item.availableSeats}
    totalEnrolled={item.totalEnrolled}
    price={item.price}
  />
))}
</div>
    </div>
    </div>
  )
}

export default PopularClasses
import React, { useEffect, useState } from 'react'


import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useUser from '../../../../hooks/useUser'
import moment from 'moment'

const EnrolledClasses = () => {
  const {currentUser} = useUser()
  const [data, setData] = useState([])
  const axiosSecure = useAxiosSecure()
  const [paginatedPayments, setPaginateData] = useState([])
  const [page,setPage] = useState(1)
  const itemPerPage = 3

useEffect(() =>{
 
  axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)

.then(res=> {
  // console.log(res.data, 'this is ')
  setData(res.data)

}).catch((err)=>console.log(err))
},[])

  return (
    <div>
    
      
    <h1 className=' text-2xl my-6'>Enrolled classes</h1>
<div className='grid md:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3'>
  {data.map((item,idx)=> (
  <div
  key={idx}
    className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-grow sm:h-52 sm:w-35"
    
    >
      <img src={item.classes.image} alt="" 
      className='h-1/2 w-full sm:h-full sm:w-1/2 object-cover '
      />
      <div className='flex-1 w-full
      flex flex-col
      items-baseline
      justify-around h-1/2
      pl-6
      sm:h-full sm:items-baseline sm:w-1/2'
      >
        <div>
          <h1 className='text-sm'>{item.classes.name}</h1>
          <p className='text-blue-400'>{item.classes.instructorName}</p>
        </div>

      </div>

  </div>
  ))}
  
</div>

    </div>
   )
  }

export default EnrolledClasses
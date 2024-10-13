import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaCopy } from "react-icons/fa6";
import { PiChalkboardTeacher } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
const AdminStats = ({users}) => {
    const [data,setData] = useState()
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
axiosSecure.get('/admin-stats').then(res => setData(res.data))
.catch(err => console.log(err))
    },[])
    console.log(data)
    if(!data) {
        return <div>LOADING... </div>
    }
  return (
    <div>
        <div className='grid grid-cols-1  gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8'>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-green-400'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 text-white' fill='none' viewBox='0 0 24 24 ' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 0 11-8 0 4 4 0 018 0z'
                         >

                        </path>
                    </svg>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-winder'>Total Member</h3>
                    <p className='text-3xl'>{users.length}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-blue-400'>
                    <FaCopy className='h-12 w-12 text-white'/>
                    
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-winder'>Approved classes</h3>
                    <p className='text-3xl'>{data?.approvedClasses}</p>
                </div>
                
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-indigo-400'>
                <PiChalkboardTeacher className='h-12 w-12 text-white' />
                    
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-winder'>Instructors</h3>
                    <p className='text-3xl'>{data?.instructors}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-red-400'>
                <MdOutlinePendingActions  className='h-12 w-12 text-white' />
                    
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-winder'>Pending</h3>
                    <p className='text-3xl'>{data?.pendingClasses}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminStats
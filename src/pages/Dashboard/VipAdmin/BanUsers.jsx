import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Pagination from '@mui/material/Pagination';
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { AuthContext } from '../../../ultilites/providers/AuthProvider';

const BanUsers = () => {
    // const { deleteUserFromFirestore } = useContext(AuthContext);
    const navigate = useNavigate()
    
    const axiosSecure = useAxiosSecure()
    const [users,setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [paginateData, setPaginateData] = useState([])
    const itemPerPage = 2
   
    
    const totalPage = Math.ceil(users.length / itemPerPage)
    const handleChange = (event,value) => {
        setPage(value)
    }
    const handleDelete = async (id) => {
        
      
        try {
          await axiosSecure.delete(`/delete-user/${id}`);
        //   await deleteUserFromFirestore(id);
          setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
          alert('deleted');
        } catch (err) {
          console.log(err);
        }
      };
    useEffect(() => {
        axiosSecure.get('/users').then(res => {
            
            setUsers(res.data)
           
        }).catch(err => console(err))
    },[])
    useEffect(() => {
        let lastIndex = page * itemPerPage
        const firstIndex = lastIndex - itemPerPage
        // if (lastIndex > users.length) {                      // лищнее условие т.к у slice оно есть под капотом //
        //   lastIndex = users.length
        // }
        const currentData = users.slice(firstIndex, lastIndex)
        setPaginateData(currentData)
        // console.log(currentData)
      }, [page, users])

      
  return (
    <div>
    <h1 className='text-4xl text-secondary font-bold text-center my-10'>Manage
      <span className='text-black'> Users</span>
    </h1>
    <div className=''>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='min-w-full text-left test-sm font-light'>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th className='text-left font-semibold'>Photo</th>
                    <th className='text-left font-semibold'>NAME</th>
                    <th className='text-left font-semibold'>ROLE </th>
                    <th className='text-left font-semibold'>Update </th>
                    <th className='text-left font-semibold'>Delete </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {
                    users.length === 0 ? (
                      <tr key="no-users">
                        <td colSpan='5' className='text-2xl font-bold'> No users found </td>
                      </tr>
                    ) : (
                        paginateData.map((user, idx) => (
                          
                        <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                          
                          <td className='whitespace-pre-wrap px-6 py-4 font-bold'>
                            <img src={user.photoURL} alt="" className='h-16 w-16 mr-4' />
                             </td>
                          <td className='whitespace-pre-wrap px-6 py-4 font-bold'>{user.name} </td>
                          <td className='whitespace-pre-wrap px-6 py-4 font-bold '>{user.role} </td>
                          {/* <td className='whitespace-pre-wrap px-6 py-4'>
                            <span
                              className={`font-bold ${
                                cls.status === "pending"
                                  ? "text-orange-400"
                                  : cls.status === "checking"
                                  ? "text-yellow-300"
                                  : cls.status === "approved"
                                  ? "text-green-500"
                                  : "text-red-600"
                              }`}
                            >
                              {cls.status}
                            </span>
                          </td> */}
                         
                          <td className='  whitespace-nowrap px-6 py-4 font-bold' >
                          <span onClick={() =>navigate(`/dashboard/update-user/${user._id}`)} className='inline-flex items-center gap-2 bg-green-400  cursor-pointer
                           text-black rounded-md px-2 font-bold'>Update <GrUpdate className='text-black' /> </span>
                          </td> 
                          <td className='  whitespace-nowrap px-6 py-4 font-bold' >
                          <span onClick={() =>handleDelete(user._id)}className='inline-flex items-center gap-2 bg-red-400  cursor-pointer
                           text-white  rounded-md px-2'>Delete <MdDeleteForever className='text-black' /></span>
                          </td> 
                          
                          
                         
                        </tr>
                      ))
                    )
                  }
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div>
              <div className='w-full h-full flex justify-center items-center my-10'>
              <Pagination onChange={handleChange} count={totalPage} color='primary' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default BanUsers

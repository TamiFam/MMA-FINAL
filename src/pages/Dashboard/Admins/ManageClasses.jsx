import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Pagination from '@mui/material/Pagination';
import Swal from 'sweetalert2'
const ManageClasses = () => {
  const navigate = useNavigate()
  const axiosFetch = useAxiosFetch()
  const axiosSecure = useAxiosSecure()
  const [classes, setClasses] = useState([])
  const [page, setPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])
  const itemPerPage = 3

  const handleApprove = (id,status)  => {
    if( status === 'approved') {
      alert('allready approved')
      return 
    } else {
    // Логика для одобрения класса
    axiosSecure.put(`/change-status/${id}`, {status: 'approved'}).then(res => {
      
      alert('Approved')
      const updateClass = classes.map(cls => cls._id === id ? {...cls, status: 'approved'} :cls)
      setClasses(updateClass)
    }).catch(err => {console.log(err)})
  }
  }
  const handleReject =   (id)  => {
    // Логика для отклонения класса
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unpablish it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res =  axiosSecure.put(`/change-status/${id}`, {status: 'rejected'})
        if (res.data.modifiedCount > 0) {
          const updateClass = classes.map(cls => cls._id === id ? {...cls, status: 'rejected'} :cls)
          setClasses(updateClass)
          Swal.fire({
            title: "Unbublished!",
            text: "Your Course is unpublish.",
            icon: "success"
          });
        }
       
      }
    });
  }
  const handleChange = (event,value) => {
    setPage(value)
  }

  useEffect(() => {
    axiosFetch.get('/classes-manage')
      .then(res =>{
        setClasses(res.data)
        // console.log(res.data)
      } )
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let lastIndex = page * itemPerPage
    const firstIndex = lastIndex - itemPerPage
    // if (lastIndex > classes.length) {                      // лищнее условие т.к у slice оно есть под капотом //
    //   lastIndex = classes.length
    // }
    const currentData = classes.slice(firstIndex, lastIndex)
    setPaginateData(currentData)
    // console.log(currentData)
  }, [page, classes])

  const totalPage = Math.ceil(classes.length / itemPerPage)

  return (
    <div>
      <h1 className='text-4xl text-secondary font-bold text-center my-10'>
        <span className='text-black'>Classes</span>
      </h1>
      <div>
        <div>
          <div>
            <div>
              <div>
                <table className='min-w-full text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th className='text-left font-semibold'>Photo</th>
                      <th className='text-left font-semibold'>Course Name</th>
                      <th className='text-left font-semibold'>Instructor Name</th>
                      <th className='text-left font-semibold'>Status</th>
                      <th className='text-left font-semibold'>Details</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {
                      classes.length === 0 ? (
                        <tr key="no-classes">
                          <td colSpan='5' className='text-2xl font-bold'> No classes found </td>
                        </tr>
                      ) : (
                        paginateData.map((cls, idx) => (
                          <tr key={cls._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                            <td className='py-4'>
                              <img src={cls.image} alt="" className='h-16 w-16 mr-4' />
                            </td>
                            <td className='whitespace-pre-wrap px-6 py-4'>{cls.name} rub</td>
                            <td className='whitespace-pre-wrap px-6 py-4'>{cls.instructorName} rub</td>
                            <td className='whitespace-pre-wrap px-6 py-4'>
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
                            </td>
                            <td className='whitespace-pre-wrap px-6 py-4'>
                              
                              <button
                                onClick={() => handleApprove(cls._id, cls.status)}
                                className='text-[12px] cursor-pointer disabled:bg-green-700 bg-green-700 py-1 rounded-md px-2 text-white mr-4'
                              >
                                Approve
                              </button>
                              <button
                                disabled={cls.status === "rejected" || cls.status === "checking"}
                                onClick={() => handleReject(cls._id)}
                                className='cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white mr-4'
                              >
                                Deny
                              </button>
                              <button
                                disabled={cls.status === "rejected" || cls.status === "checking"}
                                onClick={() => handleReject(cls._id)}
                                className='cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'
                              >
                                Feedback
                              </button>
                              
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

export default ManageClasses
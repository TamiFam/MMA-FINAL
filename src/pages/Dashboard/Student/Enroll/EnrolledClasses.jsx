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
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-gray-800 "></h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform hover:scale-105"
        >
          <img
            src={item.classes.image}
            alt=""
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col justify-between h-40">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {item.classes.name}
              </h1>
              <p className="text-sm text-blue-500 mt-1">
                {item.classes.instructorName}
              </p>
            </div>
            <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
export default EnrolledClasses
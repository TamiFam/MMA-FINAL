import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useUser from '../../../hooks/useUser'
import AdminStats from '../Admins/AdminStats'

const VipAdminCp = () => {
  const {currentUser} = useUser()
  const axiosFetch = useAxiosFetch()
  const [users, setUsers] = useState([])
  const role = currentUser?.role
  useEffect(() => {
    axiosFetch.get(`/users`)
    .then(res => {
      setUsers(res.data)
      console.log(res.data)
    })
      
      .catch(err => console.log(err))
    
  },[])
  return (
    <div className=''>
      
      <h1>Welcome Back, <span className='text-secondary'>{currentUser.name}<span className='text-black'> [{role}]</span></span></h1>
      <AdminStats users={users} />
    </div>
  )
}
export default VipAdminCp
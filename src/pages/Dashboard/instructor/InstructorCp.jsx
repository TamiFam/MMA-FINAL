import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useUser from '../../../hooks/useUser'
import Welcoming from "../../../assets/dashboard/urban-welcome.svg"
const InstructorCp = () =>{
  const {currentUser} = useUser()
  const axiosFetch = useAxiosFetch()
  const [users, setUsers] = useState([])
  useEffect(() => {
    axiosFetch.get(`/users`)
    .then(res => {
      setUsers(res.data)
      console.log(res.data)
    })
      
      .catch(err => console.log(err))
    
  },[])
  return (
    <div>
      
     
      <h1>Welcome Back, <span className='text-secondary'>{currentUser.name}</span></h1>
      <div className='h-screen flex justify-center items-center'>
      <img  onContextMenu={e => e.preventDefault()} src={Welcoming} alt="" className='h-[200px]' placeholder='blur' />
      </div>
    </div>
  )
}

export default InstructorCp
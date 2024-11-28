import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useLoaderData } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useUser from '../../../hooks/useUser'
import { useForm } from 'react-hook-form'

const UpdateUser = () => {
  const {currentUser}  = useUser()
    const userCredentials = useLoaderData()
    const [image, setImage] = useState()
    console.log(userCredentials)
    const {
      register,
      
      
      formState: { errors },
    } = useForm()
    // console.log(user)
    const axiosSecure = useAxiosSecure()
    const axiosFetch = useAxiosFetch()
    const handleFormSubmit = (e) => {
    
      e.preventDefault()
      const formData = new FormData(e.target);
      // console.log(formData)
      const newData = Object.fromEntries(formData)
      formData.append('file', image)
      // console.log(newData)
      Object.keys(userCredentials).forEach((key) => {
        if (!formData.has(key)) {
          formData.append(key, userCredentials[key]);
        }
      });
      axiosSecure.put(`/update-user/${userCredentials._id}`, newData).then((res) => {
        if(res.modifiedCoun > 0 )
        console.log(res.data)
        alert('Updated info')
        console.log(res.data)
      })
        .catch((err) => console.log(err))
      
    }
    const handleImageChange = (e) => {
      const file = e.target.files[0]
      setImage(file)
        }
  return (
    <div>
    <div>
      
    </div>
    <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
      <div className="grid grid-cols-2 w-full gap-3 items-center">
        
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="photoURL"
          >
            Photo
          </label>
          <input
            type="text"
            defaultValue={userCredentials?.photoURL}
            placeholder="Your Course Name"
            name="photoURL"
            id="photoURL"
            className="w-full px-4 py-2 border border-secondary 
      rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2 "
            htmlFor="register"
            
          >
             
            ROLE
            
          </label>
          {/* <select {...register("role", {required: true})} className='w-full border border-gray-300
                 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                  <option value="" disabled selected>Select role</option>
        <option value="female">user</option>
        <option value="male">admin</option>
        <option value="other">instructor</option>
      </select> */}
          <input
            type="text"
            
            defaultValue={userCredentials?.role}
            placeholder="ROLE"
            name="role"
            id="role"
            className="w-full px-4 py-2 border border-secondary 
      rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
      <div>
        <h1 className="text-[12px] my-2 ml-2 text-secondary">You can not change ur email or name</h1>
        <div className="grid gap-3 grid-cols-2">
      <div className="mb-6">
        <label htmlFor="instructorName"
        className="block text-gray-700 font-bold mb-2"
        >
          Instructor name
        </label>
        <input type="text" 
        className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
        value={userCredentials?.name}
        readOnly
        disabled
        placeholder="Instructor name"
        name="instructorName"
        
        />

      </div>
      <div className="mb-6">
        <label htmlFor="instructorEmail"
        className="block text-gray-700 font-bold mb-2"
        >
          Instructor email
        </label>
        <input type="text" 
        className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
        value={userCredentials?.email}
        readOnly
        disabled
        placeholder="Instructor email"
        name="instructorEmail"
        
        />
        
      </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-3 items-center">
        
     
      <div className="grid grid-cols-1 w-full gap-3 items-center">
       
        </div>
      </div>
    
           <div className="mb-6">
          <label htmlFor="description"
           className="block text-gray-700 font-bold mb-2"
          >Updated Info
          </label>
          
          <textarea
          className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
          type='text'
          required
          
          placeholder='Descripton about ure course?'
          name="description"
          id='description'
          ></textarea>
           </div>
           <div>
            <button className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded" type="submit">Add New Course</button>
           </div>
    </form>
  </div>
  )
}

export default UpdateUser
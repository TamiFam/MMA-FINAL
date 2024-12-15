import React, { useState } from "react";

import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
  

const KEY = import.meta.env.VITE_IMG_TOKEN

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`
  const [image, setImage] = useState(null)
  const {currentUser}  = useUser()
  const handleFormSubmit = (e) => {
    
    e.preventDefault()  
    const formData = new FormData(e.target);
    // console.log(formData)
    const newData = Object.fromEntries(formData)
    formData.append('file', image)
    // console.log(newData)

    fetch(API_URL,{
      method: 'POST',
      body: formData,

    }).then(res =>res.json()).then(data =>{
      console.log(data)
      if(data.success === true) {
        console.log(data.data.display_url)
        newData.image = data.data.display_url
        newData.instructorName = currentUser?.name
        newData.instructorEmail = currentUser?.email
        newData.status = 'pending'
        newData.submitted = new Date()
        newData.totalEnrolled = 0
        newData.availableSeats  = Number(newData.availableSeats, 10)
        
        axiosSecure.post('/new-class',newData).then(res => {
          console.log(res.data)
          alert('Course added ')
        }).catch(err =>console.log(err))
      }
    })
  }
  const handleImageChange = (e) => {
const file = e.target.files[0]
setImage(file)
  }

  
  return (
    <div>
      <div>
        <h1>Add ure course</h1>
      </div>
      <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Course name
            </label>
            <input
              type="text"
              required
              placeholder="Your Course Name"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-secondary 
        rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              required
              name="image"
              onChange={handleImageChange}
              className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm
      focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
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
          value={currentUser?.name}
          readOnly
          disabled
          placeholder="Instructor name"
          name="instructorName"
          
          />

        </div>
        <div className="mb-6">
          <label htmlFor="instructorName"
          className="block text-gray-700 font-bold mb-2"
          >
            Instructor email
          </label>
          <input type="text" 
          className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
          value={currentUser?.email}
          readOnly
          disabled
          placeholder="Instructor email"
          name="instructorEmail"
          
          />

        </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label htmlFor="availableSeats"
             className="block text-gray-700 font-bold mb-2"
            >Available Seats</label>
            <input
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            type='number'
            required
            placeholder='How many seats are available?'
            name="availableSeats"
            />
            
          </div>
       
        <div className="grid grid-cols-1 w-full gap-3 items-center">
          <div className="mb-6">
            <label htmlFor="price"
             className="block text-gray-700 font-bold mb-2"
            >Price</label>
            <input
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            type='number'
            required
            placeholder='How much does it cost?'
            name="price"
            />
             </div>
          </div>
        </div>
        <div className="mb-6">
            <label htmlFor="Link"
             className="block text-gray-700 font-bold mb-2"
            >Youtube link</label>
            <p className="text-sm">Only youtube videos are supported</p>
            <input
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            type='text'
            required
            placeholder='Youre couse intro video link?'
            name="videoLink"
            />
             </div>
             <div className="mb-6">
            <label htmlFor="Link"
             className="block text-gray-700 font-bold mb-2"
            >Description about ur course link
            </label>
            
            <textarea
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            type='text'
            required
            placeholder='Descripton about ure course?'
            name="description"
            ></textarea>
             </div>
             <div>
              <button className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded" type="submit">Add New Course</button>
             </div>
      </form>
    </div>
  );
};

export default AddClass;

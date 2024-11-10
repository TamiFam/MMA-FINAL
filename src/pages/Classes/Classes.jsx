import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
const Classes = () => {

  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  // console.log('currentUser:', currentUser)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const navigate = useNavigate()
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get('/checkUserBanned').then(res => {       //ес че перемести обратно в manage users
      // console.log(res.data)
    }).catch(err => console.log(err))
    
  },[])
  

  const handleHover = (index) => {
    
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch.get('/classes')
      .then((res) => {
        setClasses(res.data)
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleSelect = async (id) => {
    // console.log("Тип данных id:", typeof id);
  if (!currentUser) {
    const Toast =  Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    await Toast.fire({
      icon: "success",
      title: "Пожалуйста залогинься"
    });
    
    return navigate('/login');
  }

  try {
 

    // Check if the class is already in the cart
    const cartResponse = await axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`);
    const cartItem = cartResponse.data;

    if (cartItem && cartItem.classId === id) {
      const Toast = await Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      await Toast.fire({
        icon: "error",
        title: "Уже добавлен..."
      });
      return
    }
   // Fetch enrolled classes
   const enrolledResponse = await axiosSecure.get(`/enrolled-item/${id}?email=${currentUser?.email}`);
   const enrolledClasses = enrolledResponse.data;
   setEnrolledClasses(enrolledClasses)
   
   
    // Check if the class is already enrolled
    if (enrolledClasses && enrolledClasses.classId ===  id) {
      const Toast = await Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      await Toast.fire({
        icon: "error",
        title: "Уже Записан..."
      });
      return
    }

    // Add the class to the cart
    const data = {
      classId: id,
      userMail: currentUser?.email,
      date: new Date()
    };

    const addToCartResponse = await axiosSecure.post('/add-to-cart', data);
    const Toast = await Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    await Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
    await Swal.fire({
      title: "Go to my-selected!",
      html: `
        <style>
          .swal2-styled.swal2-confirm {
            background-color: #4caf50 !important;
            border: none !important;
            border-radius: 5px !important;
            padding: 10px 20px !important;
            font-size: 16px !important;
            transition: background-color 0.3s ease !important;
          }
          .swal2-styled.swal2-confirm:hover {
            background-color: #43a047 !important;
          }
        </style>
        <a href="/dashboard/my-selected" class="swal2-styled swal2-confirm">Go to My Selected</a>
      `,
      toast: true, // Используем toast режим
      position: "bottom-left", // Устанавливаем позицию в нижний правый угол
      showConfirmButton: false,
      timer: 5000,
      
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    // console.log(addToCartResponse.data);

  } catch (error) {
    console.error('Error handling class selection:', error);
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
      
  
    return
  }
};
function getCorrectEnding(number) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${number} мест`;
  } else if (lastDigit === 1) {
      return `${number} место`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${number} места`;
  } else {
      return `${number} мест`;
  }
}

 

  

  return (
    <div>
      <div className='mt-25 pt-3 '>
        <h1 className='text-4xl font-bold text-center text-black'>Classes</h1>
      </div>
      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {classes.slice(0, 15).map((cls, index) => (
          
          <div
          
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto  ${cls.availableSeats < 1 ? "bg-red-300" : "bg-white"} dark:bg-slate-600 rounded-lg shados-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            
            <div className='relative h-48 '>
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`} />
              <img src={cls.image} alt="" className='object-cover w-full h-full' />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button onClick={() => handleSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' : cls.availableSeats < 1 ? 'No seat Available' : 'You can select Classes'}
                    disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1  }
                    className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700 '>
                    Add to card
                  </button>
                </div>
              </Transition>
            </div>
            <div className='px-6 py-2'>
              <h3 className={`font-sembioid mb-1 text-lg `}>{cls.name}</h3>
              <p className=' text-sm '>Instructor: {cls.instructorName}</p>
              <div className='flex justify-between'>
                <span className={`text-gray-600 text-sm    `}>Доступно : {getCorrectEnding(cls.availableSeats)}</span>
                
                
                
                
              </div>
              <div className='flex justify-end'> 
              <span className='text-red-500 font-semibold text-lg mr-2 '>{cls.price  <= 0 ? '' : `${cls.price} RUB `} </span> 
              <span className='text-gray-500  font-semibold text-sm line-through  mr-5 mt-1 dark:text-white'>{` ${parseFloat(cls.price) * 2}`} </span>  {/*фейковая скидка */}
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="px-2 py-1  w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700 ">View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
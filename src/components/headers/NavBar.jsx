import { Switch } from '@mui/material';
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

import photoUrl  from '../../assets/home/ghgh.jpg'
import {FaBars} from 'react-icons/fa'
import  { AuthContext } from '../../ultilites/providers/AuthProvider';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const navLinks = [
    {name: 'Home', route:'/'},
    {name: 'Instructors', route:'/instructors'},
    {name: 'Classes', route:'/classes'},

]
const theme = createTheme({
  palette:{
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00"
    }
  },
});

const NavBar = () => { 
const navigate = useNavigate()
const location = useLocation()  
const [isMobailMenuOpen, setIsMobailMenuOpen] = useState(false)
const [isHome, setIsHome] = useState(false)
const [isLogin, setIsLogin] = useState(false)
const [scrollPosition,setScrollPosition] = useState(0)
const [isFixed, setIsFixed] = useState(false)
const [isDarkMode, setIsDarkMode] = useState(false)
const [navBg,setNavBg] = useState('bg-[#15151580]')
const {logout, user} = useAuth()
  
  const toggleMobileMenu = () => {
    setIsMobailMenuOpen(!isMobailMenuOpen)
  }
  useEffect(() => {
    const darkClass = 'dark'
    const root = window.document.documentElement
    if(isDarkMode) {
      root.classList.add(darkClass)
    } else {
      root.classList.remove(darkClass)
    }
  },[isDarkMode])
  useEffect(() => {
    setIsHome(location.pathname === '/');
    setIsLogin(location.pathname === '/login');
    setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    
  }, [location]);
  useEffect(() => {
    const handleScroll = () => {
    const currentPosition = window.pageYOffset
    setScrollPosition(currentPosition);
    
    }
    window.addEventListener('scroll', handleScroll);

    // Очистка обработчика событий при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  },[])
    useEffect(()=> {
      
  // console.log('isHome:', isHome);
      if(scrollPosition > 890) {
        
        if(isHome) {
          setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')
        } else {
          setNavBg('bg-white dark:bg-black dark:text-white text-black')
        } 
      }else {
          setNavBg
          (`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'}
          dark:text-white text-white`)
          
        }
      

    },[scrollPosition, isHome, location.pathname])
    const handleLogout = (e) => {
      e.preventDefault()
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, loogut me!"
      }).then((result) => {
        if (result.isConfirmed) {
            
                Swal.fire({
                    title: "Logged out!",
                    text: "Logged out",
                    icon: "success"
                  });
                 logout()
                }
            }).catch((error) => console.log(error))
            console.log('logout')
        }
      
      
      
    
//     console.log('isHome:', isHome);
// console.log('navBg:', navBg);
// console.log('isFixed:', isFixed);
  return (
    <motion.nav 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 1.5}}
    className={`${isHome ? navBg : 'bg-white dark:bg-black backdrop-blur-2xl dark:text-white text-black'} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}>
      
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
      <div className="px-4 py-4 flex items-center justify-between">
        {/* logo */}
        <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
          <div>
            <h1 className="text-2xl inline-flex gap-3 items-center font-bold ">
              School MMA <img src="/mma-logo-5.png" className="w-10 h-10 " />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px]">
            TRAIN MORE{" "}
            </p>
          </div>
        </div>
          {/* mobile menu icons */}

    <div className='md:hidden flex items-center'>
      <button type='button' onClick={toggleMobileMenu} className='text-gray-300 hover:text-white focus:outline-none'>
<FaBars className='h-6 w-6 hover:text-primary'/>
      </button>
    </div>
    {isMobailMenuOpen && (
            <div className='md:hidden absolute top-16 right-0   shadow-lg p-4'>
              <ul className='space-y-4'>
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink to='/dashboard' className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }>DashBoard</NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img src={photoUrl} className='h-[40px] rounded-full w-[40px]'/>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink onClick={handleLogout} className={() =>
                      `${
                        navBg.includes("bg-transparent")
                          ? "text-white"
                          : "text-black dark:text-white"
                      }
                      hover:text-secondary duration-300 font-bold`
                    }>
                      Logout
                    </NavLink>
                  </li>
                )}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className={`flex flex-col justify-center items-center ${isDarkMode ? 'dark' : ''}`}>
                      <Switch
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        className={`${isDarkMode ? 'bg-transporent' : 'bg-transporent'} relative inline-flex items-center h-6 rounded-lg w-5`}
                      >
                        <span
                          className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block w-2 h-2 transform bg-black rounded-lg`}
                        />
                      </Switch>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          )}
          {/* Navigational links */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      style={{whiteSpace: 'nowrap'}}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/* based on user(login) */}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {
                   user && <li>
                    <NavLink to='/dashboard' className={({ isActive }) =>             // Лишнее так как DashBoard перенаправляет срзу на другую страницу и не видно css свойств активных ссылок //
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }>DashBoard</NavLink>
                   </li>
                }
                {
                user && <li>
                  <img src={photoUrl} className='h-[40px] rounded-full w-[40px]'/>
                </li>
                
                }  
                {
                  user && <li><NavLink onClick={handleLogout} className={() =>             // Лишнее так как DashBoard перенаправляет срзу на другую страницу и не видно css свойств активных ссылок //
                  `${
                          navBg.includes("bg-transparent")
                            ? "text-white"
                            : "text-black dark:text-white"
                        }
                  } hover:text-secondary duration-300 font-bold`
                } >
                    Logout</NavLink></li>
                }
                {/* color toggle */}
                <li>
                  <ThemeProvider theme={theme}>
                  <div className={`flex flex-col justify-center items-center ${isDarkMode ? 'dark' : ''}`}>
      <Switch
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className={`${isDarkMode ? 'bg-transporent' : 'bg-transporent'} relative inline-flex items-center h-6 rounded-lg w-5`}
      >
       
        <span
          className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block w-2 h-2 transform bg-black rounded-lg`}
        />
      </Switch>
      
    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
    
  );
}

export default NavBar
import React, { useEffect, useState } from 'react'
import useUser from '../../../../../hooks/useUser'
import useAxiosFetch from '../../../../../hooks/useAxiosFetch'
import { v4 as uuidv4} from 'uuid'
const MyPaymentHistory = () => {

  const {currentUser} = useUser()
  const [payments,setPayments] = useState([])
  const axiosFetch = useAxiosFetch()
  const [paginatedPayments, setPaginateData] = useState([])
  const [page,setPage] = useState(1)
 let itemsPerPage =5
 const totalItem = payments.length
 const totalPaidAmount = payments.reduce((acc, item) => acc + item.price, 0)
 const ids = payments.map((item) => item.classesId.length)

 const handleChange = (event, value) => {
  setPage(value)
 }
  // useEffect(()=> {
  //   const lastIndex = page * itemsPerPage
  //   const firstIndex = lastIndex - itemsPerPage
  //   const currentItems = payments.slice(firstIndex,lastIndex)
  //   setPaginateData(currentItems)
  // },[page,payments])

  useEffect(()=> {
    axiosFetch.get(`/payment-history/${currentUser.email}`)
    .then((res)=> {
      // console.log(res.data)
      setPayments(res.data)

    }).catch((err)=>console.log(err))
  },[currentUser.email])


  return (
    <div className='text-left mr-25 text-2xl'>
      <p className='text-center text-secondary font-bold'></p>
      <div>
      <div>
        {payments.map((payment) => (
          <div key={payment._id} className='border-b py-2'>
            <p className='font-bold'>Заказ№: {uuidv4()}</p>
            <p className='bg-green-400 rounded-lg inline-block'>Цена: {payment.price} RUB</p>
            <p className='text-blue-600 rounded-lg font-bold '>Кол-во товара: {payment.classesId.length}</p>
          </div>
        ))}
      </div>
        
        <p className='font-bold '>Потраченная сумма: {Math.round(totalPaidAmount)}</p>
        <p className='font-bold'>Кол-во полученного тавара: {ids.reduce((acc,item)=> acc +item,0 )}</p>
      </div>
     
    </div>
  );
};

export default MyPaymentHistory
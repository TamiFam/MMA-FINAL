import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUser from '../../../../../hooks/useUser';

const CheckoutPayments = ({ cartItm, price }) => {
  const URL = `https://mma-server-2.onrender.com/payment-info?${cartItm && `classId=${cartItm}`}`;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [paymentString, setPaymentString] = useState('123'); // Устанавливаем начальное значение
  const [cart, setCart] = useState([]);

  if (price < 0 || !price) {
    return <Navigate to='/dashboard/my-selected' replace />;
  }

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser, axiosSecure]);

  const handlePayment = () => {
    if (!paymentString) {
      alert('Please enter the payment string');
      return;
    }
    console.log(price)

    const data = {
      paymentString:paymentString,
      userEmail: currentUser.email,
      classesId: cartItm ? [cartItm] : cart,
      price: +price,
      date: new Date(),
      
    }

fetch(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(data),
}).then(res =>res.json()).then(res=> {
  console.log(res)
  if (res.success) {
    console.log(URL)
    alert('ПОКУПКА СОЕВЕРШЕНА , ПРОВЕРЬ MY enroll');
    // Обновляем состояние корзины после успешной оплаты
    setCart()
    navigate('/dashboard/my-selected');
  } else {
    alert('Проверка кода не прошла');
  }
})
.catch((err) => {
  console.log(err);
  alert('Payment failed');
});
};
  const handleDeleteItem = (itemId) => {
    axiosSecure
      .delete(`/cart/${itemId}`)
      .then((res) => {
        if (res.data.success) {
          alert('Item deleted successfully');
          setCart(cart.filter(id => id !== itemId));
        } else {
          alert('Failed to delete item');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to delete item');
      });
  };

  const handleOut = () => {
    navigate('/dashboard/my-selected');
  };

  return (
    <>
      <div className='text-center mt-5'>
        <h1 className='text-2xl font-bold'>
          Payments Amount : <span className='text-secondary'>{price}</span>
        </h1>
        <div className='mt-5'>
          <input
            type='text'
            
            onChange={(e) => setPaymentString(e.target.value)} // Обновляем состояние при изменении значения
            className='border p-2 mr-2'
          />
          <button
            onClick={handlePayment}
            className='bg-secondary text-2xl text-center shadow-md rounded-md'
          >
            Pay Now
          </button>
          <button
            onClick={handleOut}
            className='bg-red-800 text-2xl text-center shadow-md rounded-md ml-2'
          >
            GO AWAY
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayments;
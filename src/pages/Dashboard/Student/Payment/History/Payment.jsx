import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ChekoutPayments from './ChekoutPatments';

const Payment = () => {
  const location = useLocation();

  // Используем useMemo для кэширования значений price и cartItm
  const { price, cartItm } = useMemo(() => {
    return {
      price: location?.state?.price,
      cartItm: location?.state?.itemId,
    };
  }, [location.state]);

  return (
    <ChekoutPayments price={price} cartItm={cartItm} />
  );
};

export default React.memo(Payment);
import React from 'react'
const UserRoleAnimation = ({ role }) => {
    const roles = {
        admin: "👑", // Корона для администратора
        user: "👤", // Человечек для пользователя
        instructor: "🛡️", // Щит для модератора
        // guest: "👻", // Призрак для гостя
      };
    
    const animations = {
      admin: "animate-bounce",
      user: "animate-pulse",
      instructor: "animate-spin",
      guest: "animate-ping",
    };
  
    return (
      <span className={`text-2xl ${animations[role]}`}>
        {roles[role]}
      </span>
    );
  };
export default UserRoleAnimation
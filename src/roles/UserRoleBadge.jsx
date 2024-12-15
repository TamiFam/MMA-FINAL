import React from 'react'

const UserRoleBadge = ({ role }) => {
    const badges = {
      admin: (
        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
          👑 Admin
        </span>
      ),
      user: (
        <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
          👤 User
        </span>
      ),
      instructor: (
        <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
          🛡️ Moderator
        </span>
      ),
    //   guest: (
    //     <span className="bg-gray-500 text-white text-sm px-2 py-1 rounded-full">
    //       👻 Guest
    //     </span>
    //   ),
    };
  
    return badges[role];
  };
  export default UserRoleBadge
  


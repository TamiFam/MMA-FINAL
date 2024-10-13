import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment/moment";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, [isLoading]);

  const handleFeedback = (id) => {
    // Ваша логика для обработки нажатия на кнопку "View Feedback"
  };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          My <span className="text-secondary">Classes</span>
        </h1>
        <div>
          <p className="text-[12px] my-2 text-center">
            Here you can how many classes added by you and all classes status
          </p>
        </div>
      </div>
      <div>
        {classes.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            You not added any class yet
          </div>
        ) : (
          <div>
            {classes.map((cls, index) => (
              <div key={index} className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg">
                <div className="bg-white flex justify-between rounded-lg gap-8 shadow p-4">
                  <div>
                    <img
                      src={cls.image}
                      alt=""
                      className="max-h-[300px] max-w-[300px]"
                    />
                  </div>
                  <div className="w-full ">
                    <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2">
                      {cls.name}
                    </h2>
                    <div>
                      <div className="">
                        <h1 className="font-bold mb-3">Some info :</h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black"> Total Student</span> :{" "}
                          {cls.totalEnrolled ? cls.totalEnrolled : 0}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black"> Total Seats</span> :{" "}
                          {cls.availableSeats}
                        </h1>
                        <h1 className="text-secondary my-2">
                          <span className="text-black">Status</span>:{" "}
                          <span
                            className={`font-bold ${
                              cls.status === "pending"
                                ? "text-orange-400"
                                : cls.status === "checking"
                                ? "text-yellow-300"
                                : cls.status === "approved"
                                ? "text-green-500"
                                : "text-red-600"
                            }`}
                          >
                            {cls.status}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="font-bold mb-3">.....</h1>
                      <h1 className="text-secondary my-2">
                        <span className="text-black">Price</span> :{" "}
                        {cls.price} <span className="text-black">RUB</span>
                      </h1>
                      <h1 className="text-secondary my-2">
                        <span className="text-black">Submitted</span>:{' '}
                        <span className="">
                          {cls.submitted ?
                            moment(cls.submitted).format('MMM Do YYYY')
                            : 'Not Get Data'
                          }
                        </span>
                      </h1>
                      
                    </div>
                    
                  </div>
                  <div className="w-[1800px] flex flex-col justify-between my-14 ">
                    <h1 className="text-bold mb-3">Action :</h1>
                    <button className="px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg"
                      onClick={() => handleFeedback(cls._id)}>
                      View Feedback
                    </button>
                    <button className="px-3 bg-green-500 font-bold py-1 text-white w-full rounded-lg">
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/update/${cls._id}`)}
                      className="px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg">
                      Update
                    </button>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
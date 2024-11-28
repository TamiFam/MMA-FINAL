import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/History/Payment";
import AdminCP from "../pages/Dashboard/Admins/AdminCP";
import Instructors from "../pages/instructors/instructors";
import InstructorCp from "../pages/Dashboard/instructor/instructorCp";
import MyClasses from "../pages/Dashboard/instructor/MyClasses";
import MyPendings from "../pages/Dashboard/instructor/MyPendings";
import ApprovedCourses from "../pages/Dashboard/instructor/ApprovedCourses";
import AdminStats from "../pages/Dashboard/Admins/AdminStats";
import ManageClasses from "../pages/Dashboard/Admins/ManageClasses";
import AddClass from "../pages/Dashboard/instructor/AddClass";
import ManageUsers from "../pages/Dashboard/Admins/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admins/UpdateUser";
import ManageAplication from "../pages/Dashboard/Admins/ManageAplication";
import FeedbackUser from "../pages/Dashboard/Admins/feedbackUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/instructors",
        element: <Instructors />
      },
      {
        path: "/classes",
        element: <Classes />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/class/:id",
        element: <SingleClass />,
        loader: ({ params }) => fetch(`http://localhost:3000/

/class/${params.id}`)
      },
    ]
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      // students routes
      {
        path: 'student-cp',
        element: <StudentCP />
      },
      {
        path: 'enrolled-class',
        element: <EnrolledClasses />
      },
      {
        path: 'my-selected',
        element: <SelectedClasses />
      },
      {
        path: 'my-payments',
        element: <MyPaymentHistory />
      },
      {
        path: 'apply-instructor',
        element: <AsInstructor />
      },
      {
        path: 'user/payment',
        element: <Payment />
      },
      // instructor routes
      {
        path: 'instructor-cp',
        element: <InstructorCp />
      },
      {
        path: 'add-class',
        element: <AddClass />
      },
      {
        path: 'my-classes',
        element: <MyClasses />
      },
      {
        path: 'my-pending',
        element: <MyPendings />
      },
      {
        path: 'my-approved',
        element: <ApprovedCourses />
      },
      // admin routes
      {
        path: 'admin-home',
        element: <AdminCP />
      },
      {
        path: 'manage-class',
        element: <ManageClasses />
      },
      {
        path: 'manage-users',
        element: <ManageUsers />
      },
      {
        path: 'feedback-user',
        element: <FeedbackUser />
      },
      {
        path: 'update-user/:id',
        element: <UpdateUser />,
        loader: ({ params }) => fetch(`http://localhost:3000

/users/${params.id}`)
      },
      {
        path: 'manage-application',
        element: <ManageAplication />
      },
      AdminStats
    ]
  }
]);
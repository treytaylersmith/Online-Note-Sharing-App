import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"

import Home from './components/pages/home';
import Login from './components/pages/login.jsx';
import Signup from './components/pages/signup.jsx';
import CourseList from './components/Courses/courseLIst.jsx';
import Course from './components/pages/course.jsx';
import Profile from './components/pages/Profile.jsx'

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    
    children: [
     {
      index: true,
      element: <Home/>
     }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },{
        path: '/courseLIst',
        element: <CourseList/>
      },{
        path: '/course/:_id',
        element: <Course/>
      },
      {
        path: '/user/:_id',
        element: <Profile/>
      },
      {
        path: '/editProfile',
        element: <editProfile/>
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)












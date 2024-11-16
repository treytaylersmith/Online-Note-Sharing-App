import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/pages/home';
import Login from './components/pages/login.jsx';
import Signup from './components/pages/signup.jsx';
import Courses from './components/Courses/courseLIst.jsx';
import Course from './components/pages/course.jsx';
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
        element: <Courses/>
      },{
        path: 'pages/course/:id',
        element: <Course/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)












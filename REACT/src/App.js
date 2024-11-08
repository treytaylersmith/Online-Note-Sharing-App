import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import CourseList from './components/CourseList';

const App = () => (
    <Router>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<CourseList />} />
        </Routes>
    </Router>
);

export default App;


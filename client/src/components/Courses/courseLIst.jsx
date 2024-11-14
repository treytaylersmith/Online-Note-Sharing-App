import React, { useEffect, useState } from 'react';
import api from '../api';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await api.get('/courses');
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <ul>
            {courses.map(course => <li key={course._id}>{course.name}</li>)}
        </ul>
    );
};

export default CourseList;
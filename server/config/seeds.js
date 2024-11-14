const db = require('./connection');
const { User, Course, Progress, Note } = require('../models');
const cleanDB = require('./db');


db.once('open', async () => {
    await cleanDB('Course', 'courses');
    await cleanDB('Progress', 'progresses');
    await cleanDB('Note', 'notes');
    await cleanDB('User', 'users');


    const notes = await Note.insertMany([
        { noteAuthor: 'James', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Alyssa', text: 'Lorem ipsum' , createdAt: Date.now()},
        { noteAuthor: 'Thomas', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Clarence', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Clifford', text: 'Lorem ipsum', createdAt: Date.now() },
    ]);

    console.log('notes seeded');

    const courses = await Course.insertMany([
        {
            name: 'Biology', 
            startDate:Date.now(), 
            endDate: (Date.now() + (120 *24 *60* 60* 1000)), 
            assignments: 20,
            notes:[notes[0]._id, notes[1]._id, notes[2]._id]
        },
        {
            name: 'Computer Science', 
            startDate:Date.now(), 
            endDate: (Date.now() + (90 *24 *60* 60* 1000)), 
            assignments: 12,
            notes:[notes[4]._id]
        },
        {
            name: 'Algebra 2', 
            startDate:Date.now(), 
            endDate: (Date.now() + (150 *24 *60* 60* 1000)), 
            assignments: 30,
            notes:[]
        },
    ]);

    console.log('courses seeded');

    const users = await User.insertMany([
        {
            userName: 'James',
            email: 'james@email.com',
            password: '123456AB',
            courses: [ courses[0]._id, courses[1]._id]
        },
        {
            userName: 'Alyssa',
            email: 'alyssa@email.com',
            password: '123456AB',
            
        },
        {
            userName: 'Thomas',
            email: 'thomas@email.com',
            password: '123456AB',
            courses: [ courses[1]._id]
        },
        {
            userName: 'Clarence',
            email: 'clarence@email.com',
            password: '123456AB',
            
        },
        {
            userName: 'Clifford',
            email: 'clifford@email.com',
            password: '123456AB',
            courses: [ courses[2]._id]
        },
    ]);

    await User.create(
        {
        userName: 'George',
        email: 'george@email.com',
        password: '123456AB',
        
        });
    console.log('users seeded');

    const progresses = await Progress.insertMany([
        {
            courseId: courses[0]._id,
            userId: users[0]._id,
            assignmentsDone: 3
        },
        {
            courseId: courses[1]._id,
            userId: users[0]._id,
            assignmentsDone: 4
        },
        {
            courseId: courses[1]._id,
            userId: users[2]._id,
            assignmentsDone: 10
        },
        {
            courseId: courses[2]._id,
            userId: users[4]._id,
            assignmentsDone: 12
        }
    ]);

    console.log('progresses seeded');

    process.exit();
});
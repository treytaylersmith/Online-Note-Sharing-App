const db = require('./connection');
const { User, Course, Progress, Note } = require('../models');
const cleanDB = require('./cleanDB');


db.once('open', async () => {
    await cleanDB('Course', 'courses');
    await cleanDB('Progress', 'progresses');
    await cleanDB('Note', 'notes');
    await cleanDB('User', 'users');


    const notes = await Notes.insertMany([
        { noteAuthor: 'James', text: 'Lorem ipsum' },
        { noteAuthor: 'Alyssa', text: 'Lorem ipsum' },
        { noteAuthor: 'Thomas', text: 'Lorem ipsum' },
        { noteAuthor: 'Clarence', text: 'Lorem ipsum' },
        { noteAuthor: 'Clifford', text: 'Lorem ipsum' },
    ]);

    console.log('notes seeded');

    const courses = await Course.insertMany([
        {
            name: 'Biology', 
            startDate:Date.now(), 
            endDate: (Date.now() + (120 *24 *60* 60* 1000)), 
            assignments: 20,
            notes:[notes[0], notes[1], notes[2]]
        },
        {
            name: 'Computer Science', 
            startDate:Date.now(), 
            endDate: (Date.now() + (90 *24 *60* 60* 1000)), 
            assignments: 12,
            notes:[notes[4], notes[5], notes[6]]
        },
        {
            name: 'Algebra 2', 
            startDate:Date.now(), 
            endDate: (Date.now() + (150 *24 *60* 60* 1000)), 
            assignments: 30,
            notes:[notes[7], notes[8], notes[3]]
        },
    ]);

    console.log('courses seeded');

    const users = await User.insertMany([
        {
            userName: 'James',
            email: 'james@email.com',
            password: '123456AB',
            courses: [ courses[0], courses[1]]
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
            courses: [ courses[1]]
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
            courses: [ courses[2]]
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
            courseId: courses[0],
            userId: users[0],
            assignmentsDone: 3
        },
        {
            courseId: courses[1],
            userId: users[0],
            assignmentsDone: 4
        },
        {
            courseId: courses[1],
            userId: users[2],
            assignmentsDone: 10
        },
        {
            courseId: courses[2],
            userId: users[4],
            assignmentsDone: 12
        }
    ]);

    console.log('progresses seeded');

    process.exit();
});
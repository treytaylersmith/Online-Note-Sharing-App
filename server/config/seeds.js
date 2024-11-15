const db = require('./connection');
const { User, Course, Progress, Note, Category } = require('../models');
const cleanDB = require('./db');


db.once('open', async () => {
    await cleanDB('Course', 'courses');
    await cleanDB('Progress', 'progresses');
    await cleanDB('Note', 'notes');
    await cleanDB('User', 'users');


    const notes = await Note.insertMany([
        { noteAuthor: 'James', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Alyssa', text: 'Lorem ipsum' , createdAt: Date.now() },
        { noteAuthor: 'Thomas', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Clarence', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Clifford', text: 'Lorem ipsum', createdAt: Date.now() },
        { noteAuthor: 'Sophia', text: 'Philosophy is the foundation of all learning.', createdAt: Date.now() },
        { noteAuthor: 'Emily', text: 'Algorithms are the key to understanding computer science.', createdAt: Date.now() },
        { noteAuthor: 'Liam', text: 'History shapes the future; never forget the past.', createdAt: Date.now() },
        { noteAuthor: 'David', text: 'The future of AI depends on ethics and innovation.', createdAt: Date.now() },
        { noteAuthor: 'Isabella', text: 'English literature unlocks the door to creativity and imagination.', createdAt: Date.now() },
    ]);

    console.log('notes seeded');

    const categories = await Category.insertMany([
        {
            name: "STEM"
        },
        {
            name: "Arts & Media"
        },
        {
            name: "History"
        },
        {
            name: "English"
        },
    ]);
    const courses = await Course.insertMany([
        {
            name: 'Biology', 
            startDate: Date.now(), 
            endDate: (Date.now() + (120 *24 *60* 60* 1000)), 
            assignments: 20,
            notes: [notes[0]._id, notes[1]._id, notes[2]._id],
            category: categories[0]._id
        },
        {
            name: 'Computer Science', 
            startDate: Date.now(), 
            endDate: (Date.now() + (90 *24 *60* 60* 1000)), 
            assignments: 12,
            notes: [notes[4]._id],
            category: categories[0]._id
        },
        {
            name: 'Algebra 2', 
            startDate: Date.now(), 
            endDate: (Date.now() + (150 *24 *60* 60* 1000)), 
            assignments: 30,
            notes: [],
            category: categories[0]._id
        },
        {
            name: 'Digital Arts',
            startDate: Date.now(), 
            endDate: (Date.now() + (110 *24 *60* 60* 1000)), 
            assignments: 18,
            notes: [notes[6]._id],
            category: categories[1]._id
        },
        {
            name: 'World History',
            startDate: Date.now(), 
            endDate: (Date.now() + (130 *24 *60* 60* 1000)), 
            assignments: 25,
            notes: [notes[7]._id, notes[8]._id],
            category: categories[2]._id
        },
        {
            name: 'Creative Writing',
            startDate: Date.now(), 
            endDate: (Date.now() + (100 *24 *60* 60* 1000)), 
            assignments: 15,
            notes: [notes[9]._id],
            category: categories[3]._id
        },
        {
            name: 'Machine Learning',
            startDate: Date.now(), 
            endDate: (Date.now() + (140 *24 *60* 60* 1000)), 
            assignments: 20,
            notes: [notes[5]._id, notes[6]._id],
            category: categories[0]._id
        },
        {
            name: 'Philosophy',
            startDate: Date.now(), 
            endDate: (Date.now() + (150 *24 *60* 60* 1000)), 
            assignments: 20,
            notes: [notes[7]._id],
            category: categories[2]._id
        },
        {
            name: 'Literature Analysis',
            startDate: Date.now(), 
            endDate: (Date.now() + (80 *24 *60* 60* 1000)), 
            assignments: 10,
            notes: [notes[8]._id],
            category: categories[3]._id
        }
    ]);

    console.log('courses seeded');

 // Seeding Users one by one
 const userData = [
    {
      username: 'James',
      email: 'james@email.com',
      password: '123456AB',
      courses: [courses[0]._id, courses[1]._id]
    },
    {
      username: 'Alyssa',
      email: 'alyssa@email.com',
      password: '123456AB',
    },
    {
      username: 'Thomas',
      email: 'thomas@email.com',
      password: '123456AB',
      courses: [courses[1]._id]
    },
    {
      username: 'Clarence',
      email: 'clarence@email.com',
      password: '123456AB',
    },
    {
      username: 'Clifford',
      email: 'clifford@email.com',
      password: '123456AB',
      courses: [courses[2]._id]
    },
    {
      username: 'Sophia',
      email: 'sophia@email.com',
      password: '123456AB',
      courses: [courses[3]._id, courses[4]._id]
    },
    {
      username: 'Ethan',
      email: 'ethan@email.com',
      password: '123456AB',
      courses: [courses[5]._id, courses[6]._id]
    },
    {
      username: 'Olivia',
      email: 'olivia@email.com',
      password: '123456AB',
      courses: [courses[7]._id]
    },
    {
      username: 'Isabella',
      email: 'isabella@email.com',
      password: '123456AB',
      courses: [courses[2]._id, courses[3]._id]
    },
    {
      username: 'Liam',
      email: 'liam@email.com',
      password: '123456AB',
      courses: [courses[5]._id, courses[8]._id]
    }
  ];

 // Array to store newly created users
const users = [];

// Create each user individually
for (let user of userData) {
  try {
    const newUser = await User.create(user);
    users.push(newUser); // Add the newly created user to the 'users' array
    console.log(`User created: ${newUser.username}`);
  } catch (err) {
    console.error(`Error creating user: ${user.username}`, err);
  }
}

console.log('Users array:', users); // Log the users array for reference

    

    await User.create(
        {
        username: 'George',
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
            assignmentsDone: 12,
        },
        {
            courseId: courses[3]._id,
            userId: users[5]._id,
            assignmentsDone: 8
        },
        {
            courseId: courses[4]._id,
            userId: users[5]._id,
            assignmentsDone: 15
        },
        {
            courseId: courses[5]._id,
            userId: users[6]._id,
            assignmentsDone: 5
        },
        {
            courseId: courses[6]._id,
            userId: users[6]._id,
            assignmentsDone: 7
        },
        {
            courseId: courses[7]._id,
            userId: users[7]._id,
            assignmentsDone: 6
        },
        {
            courseId: courses[8]._id,
            userId: users[8]._id,
            assignmentsDone: 3
        }
    ]);
    

    console.log('progresses seeded');

    process.exit();
});
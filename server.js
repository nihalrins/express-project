// const express=require('express');

// const app=express();
// app.get('/',(req,res)=>{

// });

// app.listen(3000,()=>{
//     console.log("Server running at http://localhost:3000");

// })

import express from 'express';
const app=express();


 app.use(express.json());

let students = [
  {
    id: 1,
    name: "Anu",
    age: 20,
    course: "Mern",
    email: "anu@gmail.com"
  },
  {
    id: 2,
    name: "Ajay",
    age: 21,
    course: "Python",
    email: "ajay@gmail.com"
  },
  {
    id: 3,
    name: "Rahul",
    age: 22,
    course: "Mern",
    email: "rahul@gmail.com"
  }
];

app.get('/getstudents', (req, res)=>{
  res.status(200).json({
    message: "student details fetched successfully",
    students: students
  })
});


app.get('/getstudent/:id', (req, res)=>{
  const id = Number(req.params.id);
  const student = students.find((student)=>student.id === id);
  if (!student) {
    res.status(404).json({
        message:"Student not found"
    })
}
res.status(200).json({
     message:"Student details fetched succesfully ",
     students:students
})
})

//add a student
app.post('/addStudent', (req, res)=>{
  const {name, age, course, email} = req.body;
  if (!name || !age || !course || !email){
    res.status(404).json({
      message: "all fields are required"
    });
  }

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name: name,
    age: age,
    course: course,
    email: email
  };

  students.push(newStudent);
  res.status(201).json({
    message: "student added successfully",
    student: newStudent
  });
});


app.listen(3000,()=>
{
    console.log("Server running at http://localhost:3000");
})
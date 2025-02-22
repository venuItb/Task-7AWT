const express = require('express');
var app = express();
app.use(express.json());

app.listen(2000, () => {
    console.log("server started");
});

let students = [
    { id: 1, name: 'venu', age: 19 },
    { id: 2, name: 'gopal', age: 20 },
    { id: 3, name: 'raj', age: 21 }
];

// Get all students
app.get("/students", (req, res) => {
    if (students.length > 0) {
        res.status(200).json(students);
    } else {
        res.status(404).json({
            "message": "students not available"
        });
    }
});

// Get student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    let student = students.find(s => s.id === id);
    if (student) {
        res.status(200).json({
            "message": "student found",
            "student": student
        });
    } else {
        res.status(404).json({
            "message": "student not found"
        });
    }
});

//deleteing student based on id
app.delete("/students/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    let student=students.find(s=>s.id===id);
    if(student){
        students=students.filter(s=>s.id!==id);
        res.status(200).json({
            "message":"student deleted",
            "student":students
        });
    }
    else{
        res.status(404).json({
            "message":"student not found"
        });
    }
});

//posting student
app.post("/addStudent",(req,res)=>{
    let stu=req.body;
    students.push(stu);
    res.status(200).json({
        "message":"student data inserted",
        "students":students
    });
});

//updating student data
app.put("/updateStudent/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const studentId = students.findIndex(s => s.id === id);

    if (studentId!==-1) {
        students[studentId].name = req.body.name;
        students[studentId].age = req.body.age;
        res.status(200).json({
            "message": "student data updated",
            "students": students
        });
    } else {
        res.status(404).json({
            "message": "student not found"
        });
    }
});


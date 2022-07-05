const express = require("express");
require("./database/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// app.get("/", (req,res) =>{
//     res.send("Hello there!");
// })


//Create New Students
app.post("/students", (req,res) =>{
   console.log(req.body);
   const user = new Student(req.body);
   user.save().then(() =>
   {
    res.status(201).send(user);
   }).catch ((e) => {
   res.status(400).send(e);
   })
})
//Read Student Data
app.get("/students", async(req,res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);

    }catch(e)
    {
        res.send(e);

    }
})

// app.patch("/students/:id" , async (req, res) => {
//     try{
//         const _id = req.params.id;
//         Student.findByIdAndUpdate(_id , req.body );
//         res.send(updateStudents)

//     }catch(e) {
//         res.status(404).send(updateStudents)
//     }
// })


app.delete("/students/:id", async(req, res) => {
    try
    {
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send(); 
        }
        res.send(deleteStudent);
    }catch(e) {
        res.status(500).send(e);
    }

})





app.listen(port , () => {
    console.log('Connection is Successful at port 3000');
})
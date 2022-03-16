const express = require("express");
const app = express();

const PORT = 8000;
let students = require(`${__dirname}/students.json`);
app.use(express.json());
const fs = require("fs");

app.listen(PORT,()=>{
    console.log(`Listning on PORT no: ${PORT}`);
})

app.get("/" , (req,res)=>{
    res.send("Welcome to Home page");
})
app.get("/users" , (req , res)=>{
 res.json(students);
})
app.post("/users" , (req , res)=>{
    students.push(req.body);
    fs.writeFileSync(`${__dirname}/students.json` , JSON.stringify(students));
    res.json(req.body);
})
app.put("/users/:id" , (req , res) => {
    const {id} = req.params;
    const idtoPut = Number(id);
    const dataToPut = req.body;

    const std = students.map((student) => (student.id === idtoPut ? dataToPut : student));
    fs.writeFileSync(`${__dirname}/students.json` , JSON.stringify(std));
    res.status(200).json(std);
})
app.delete("/users/:id" , (req , res)=>{
    const { id } = req.params;
    const idtoDelete = Number(id);
    
    const student = students.findIndex(i => i.id === idtoDelete);

    students.splice(student , 1);
    fs.writeFileSync(`${__dirname}/students.json`, JSON.stringify(students));
})
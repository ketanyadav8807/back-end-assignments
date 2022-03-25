//?1 .find all movies which are equal to movie_name
//db.users.find({movie_name :{$eq : "Wind"}})

//?2 .find all movies which are not equal to movie_name
//db.users.find({movie_name : {$ne : "Wind"}})

//?3 .find all movies greater than and greater than equal to a budget
//db.users.find({budget : {$gte : 10989}}).pretty()

//?4 .find all movies less than and less than equal to a budget
//db.users.find({budget : {$lte : 14744}}).pretty()

//?5 .find all movies that are produced after 2000 with budget greater than 10000
//db.users.find({$and : [{production_year : {$gt : 2000}} , {budget : {$gte : 10000}} ]})

//?6 .find all movies that are produced after 2000 or budget greater than 10000
//db.users.find({$or : [{production_year : {$gt : 2000}} , {budget : {$gte : 10000}} ]})

//?7 .find all movies that are neither produced after 2000 nor with budget greater than 10000.
// db.users.find({$nor : [{production_year: {$gte : 2000}} , {budget : {$gte : 10000}}]})

//?8 .find all movies that are not produced in 2000 or they do not have budget of 10000
// db.users.find({$or : [{production_year : {$not : {$eq : 2000}}} , {budget : {$not : {$eq : 10000}}}]}).pretty()

//?9 .find all movies that were produced from 2000 to 2010.
// db.users.find({$and : [{production_year : {$gte: 2000}} , {production_year : {$lte : 2010}}]})

//?10 .Sort all movies descending based on the production year and if the year is same then alphabetically for their movie_names
//  db.users.find({production_year : {$gt : 0}}, {production_year : 1 , "_id" : 0 , "movie_name": 1}).sort({production_year : 1}).pretty()

//?11 .in query 10 skip the first 10 entries and fetch the next 5
// db.users.find({production_year : {$gt : 0}}, {production_year : 1 , "_id" : 0 , "movie_name": 1}).sort({production_year : 1}).skip(10).limit(5).pretty()

//?12 .remove movie genre from the first 10 movies in query 10.
//db.users.updateMany({},{$unset : {"movie_genre": ""}})


const express = require("express");
const PORT = 8000;
const app = express();
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/test"
mongoose.connect(DB_URL);
const userModel = require("./schema/user.schema");
app.use(express.json());


app.get("/movies" , async(req , res)=>{
    res.status(200);
    const movies = await userModel.find();
    res.json(movies);
})

app.get("/movies/:id" , async(req , res)=>{
    res.status(200);
    const movies = await userModel.findById(req.params.id);
    res.json(movies);
})

app.delete("/movies/:id" , async(req , res)=>{
    res.status(200);
    const movies = await userModel.findByIdAndDelete(req.params.id);
    res.json(movies);
})

app.patch("/movies/:id" , async(req , res)=>{
    res.status(200);
    const movies = await userModel.findByIdAndUpdate(req.params.id , req.body , {new : true});
    res.json(movies);
})

app.post("/movies" , async (req , res)=>{
    const createMovie = await userModel.create(req.body);
    res.status(200).json(createMovie);
    
})

app.listen(PORT , ()=>{
    console.log(`Listning on port ${PORT}`);
})


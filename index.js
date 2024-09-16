
//no use of index.js in this project.
const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var app = Express();

app.use(BodyParser.json());
Mongoose.connect("mongodb://localhost/DB");
const PersonModel = Mongoose.model("details", {
    name: String,
    password: String
});
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/person", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/people", async (request, response) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
/*app.get("/person/:id", async (request, response) => {});
app.put("/person/:id", async (request, response) => {});
app.delete("/person/:id", async (request, response) => {});*/

app.listen(8000, () => {
    console.log("Listening at :8000...");
});









/*console.log("first");
const mongoose = require('mongoose');

const express=require('express');
const Bodyparse=require('body-parser');
const app=express();
app.use(Bodyparse.json());
require('./dbcheck');
const personmodel=mongoose.model("person",{
    username:String,
    password:String
})
app.post("/person",async(req,res,next)=>{
    try{
        var person=new personmodel(req.body);
        var result=await person.save();
        Response.send(result);
    }catch(error){
       response.status(500).send(error);
    }
    
});
app.listen(8000);*/
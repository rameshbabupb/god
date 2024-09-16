const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
require('./dbcheck.js');
const PersonModel = Mongoose.model("details", {
    name: String,
    password: String
});
app.use(BodyParser.urlencoded({ extended: false}));

/*app.get("/person", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        console.log(person);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});*/
app.get("/people", async (request, response) => {
    try{
        var result = await PersonModel.find().exec();
        console.log(result[0].name);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/existing", async (request, response) => {
    try{
        var person = new PersonModel(request.body);//getting body
        
        console.log("given=>"+person.name+"  and   "+person.password);
        var result = await PersonModel.find({"name":person.name,"password":person.password}).exec();
        console.log(Object.keys(result).length);
        console.log(`result is ${result}`);
        if(Object.keys(result).length>=1){
        console.log("exists");response.status(200).send("exists");}
        else{
            console.log("not exists");response.status(400).send("not exists");
        }
        //console.log(`result is ${result}`);
        /*for(var i=0;i<Object.keys(result).length;i++)
        {    //console.log("original=>"+result[i].name+" and "+result[i].password);
            if((result[i].name==person.name)&&(result[i].password==person.password))
            {
                //var end="exists";break;
                
                 response.status(200).send('exists and Acceptable');
               //response.status ==200;
               //return response.json();
            }
            else{
               // var end="not exists";
                response.status(400).send('not exists and Not Acceptable');
               // response.status ==404; 
                //return response.json();
            }
        }
        debugger;*/
       // response.send(end);
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

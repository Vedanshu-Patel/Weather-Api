let express = require('express');
let app = express();

app.use(express.static("public"));

let request=require('request');

var BodyParser = require("body-parser");

app.use(BodyParser.urlencoded({ extended: false }))


app.use(BodyParser.json())

let ss="";
app.get("/", function(req, res) {
    res.render("home.ejs");
});


app.post("/weath", function(req, res) {
    let s=req.body.place;
    
    let xx="https://api.openweathermap.org/data/2.5/weather?units=metric&appid=5b8b096bda3de770a19c5b78feb7c599&q=" +s;
    request(xx,function(error, response,body) {
        if(!error && response.statusCode==200){
            let parsedData=JSON.parse(body);
            res.render("home.ejs",{datav:parsedData});
        }
        else{
            console.log("Something went Wrong!");
        }
        

    });

});

// or

// app.post("/weath", function(req, res) {
//     let s=req.body.place;
//     ss=s
//     res.redirect("/weatherr");

// });


// app.get("/weatherr", function(req, res) {
    
//     let xx="https://api.openweathermap.org/data/2.5/weather?units=metric&appid=5b8b096bda3de770a19c5b78feb7c599&q=" +ss;
//     request(xx,function(error, response,body) {
//         if(!error && response.statusCode==200){
//             let parsedData=JSON.parse(body);
//             
//             res.render("home.ejs",{datav:parsedData});
//         }
//         else{
//             console.log("Something went Wrong!");
//         }
        

//     });
// });



app.get("*", function(req, res){
    res.send("Wrong!!!");
});

app.listen(8888, function(){
    console.log("Weather App Started!!");
});
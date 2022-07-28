const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
    // res.send("server is up and running");
})



app.post("/",function(req,res){
    
    const city=req.body.cityName;
    const query=city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+",India&APPID=20286b53422753d9ea66b9c087f9fbd1&units=metric#";

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.write("<p>the temperature is "+temp+" degrees celcius</p>")
            res.write("<p>the weather is "+weatherDescription + "</p>")
            res.write('<img src="'+imgURL+'">')

            res.send()
        })
    })
})




app.listen(3000,function(){
    console.log("server is running on port 3000"); 
})

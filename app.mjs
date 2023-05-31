import express, { response } from "express";
import https from "https";
import path from "path";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const __mkdir =  path.resolve();


app.get("/", (req,res)=>{
    res.sendFile(path.join(__mkdir, "index.html"));
    })
    
app.post("/", (req,res)=>{
    
    const location = req.body.cityName;
    const apiKey = "5344d8135f696a41e79f121e5649a7fc";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=" + units +"&appid=" + apiKey;
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            let weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>Weather in " + req.body.cityName +" is " + temp + " degree Celsius</h1>");
            res.write("<img src =" + imageurl + ">");
            res.send();
        })
    });
        
})
    

    

app.listen(3000, ()=>{
    console.log("I am listening");
});
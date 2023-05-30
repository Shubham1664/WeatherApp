import express from "express";
import https from "https";

const app = express();
const url = "https://api.openweathermap.org/data/2.5/weather?q=London&unit=metrics&appid=5344d8135f696a41e79f121e5649a7fc";

app.get("/", (req,res)=>{

    https.get(url, (response)=>{
        
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            console.log(weatherData);
        })
    })
    res.send("Server is up and running");
})

app.listen(3000, ()=>{
    console.log("I am listening");
});
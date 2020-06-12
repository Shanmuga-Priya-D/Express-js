const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)//my server to client browser
{ 
    res.sendFile(__dirname+"/index.html");

    
});

app.post("/",function(req,res)
{

    const query=req.body.cityName;
    const apikey="eb8e1e2a1a5d3aaf39f3681eba985cb6";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+ apikey +"&q="+ query +"&units="+ unit +"";
    https.get(url,function(response)//dataprovider (API) to my server
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const des=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The Temperature in " + query + " is " + temp +" degress celsius</h1>");
            res.write("<p>The Weather is currently "+des+"</p>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    });

});







app.listen(3000,function()
{
console.log("server is running on port 3000");
});
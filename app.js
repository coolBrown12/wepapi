const https = require('https');
const express = require('express');
const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html")
   
});

app.post('/',(req,res)=>{
    
    const query=req.body.cityname
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=bdb389adb0b97267376f112c98c4d5c0&units=metric';

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
            const t1 = JSON.parse(data).main.temp; // Extracting temperature from JSON response
            res.write("<h1>The temperature " + t1)
        });

        response.on('end', () => {
            console.log(data);
        });
    }).on('error', (error) => {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    });
})

app.listen(5000, () => console.log("our server is running on port 5000"));

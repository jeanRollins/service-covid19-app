const express = require('express')
const app     = express()
//return how json
app.use( express.json() )

// .env file
var env = require('node-env-file') 
env( __dirname + '/.env')

// data
const covidData = require('./src/Data')


app.get( '/' , ( req , res ) => {
    
    const send = async () => {
        try{

            res.send({
                status : 200 ,
                message : 'Welcome to api service covid-19 app.'
            })
        }
        catch(error){}

    } 

    return send()
})

app.get('/api/getCovidData' , (  req , res) => {

    const fetchApi = async () => {
        
        try {
            const data = await covidData.GetNotices()
            
            res.send({
                notices : data ,
                status  : 200
            })
        } 
        catch (error) {}
    } 

    return fetchApi()
})

app.listen( process.env.PORT || 7000, () => {
    console.log('Status : server OK!' )
})

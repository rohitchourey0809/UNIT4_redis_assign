const express = require('express')
const app = express()


const connect = require('./configs/db')



app.listen(5000,async function(){
    try{
        await connect()
        console.log("listening port 5000")
    }
    catch(err){
        console.error(err)
    }
})
module.exports = app






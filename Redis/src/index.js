const express = require('express')
const todocontroller = require('./controllers/todo.controller')


const app = express()
app.use(express.json())

app.use("/todolink",todocontroller)

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






// server creation

//1. import express

const { request } = require('express')
const express = require('express')

//2.create an app using express

const app = express()

// import data service
const datService = require('./service/data.service')


app.use(express.json())

//4. Resolving HTTP request

//Get Request - read data
app.get('/',(req,res)=>{
    res.send('GET METHOD')
})

//post - create data
app.post('/',(req,res)=>{
    res.send('post METHOD')
})
//put - create and update data
app.put('/',(req,res)=>{
    res.send('put METHOD......')
})

//patch - create and update data
app.patch('/',(req,res)=>{
    res.send('patch METHOD')
})
//patch - create and update data
app.delete('/',(req,res)=>{
    res.send('delete METHOD')
})
// login

//register api
//post - create data
app.post('/register',(req,res)=>{
const result = datService.register(req.body.acno,req.body.username,req.body.password)
   
    res.status(result.statusCode).json(result)
})



//3. create port number

app.listen(3000,()=>{
    console.log("server started at port 3000");
}
)
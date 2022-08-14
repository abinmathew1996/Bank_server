// server creation

//1. import express

const { request } = require('express')

  // import jsonwebtoken
  const jwt =require('jsonwebtoken')


const express = require('express')

//2.create an app using express

const app = express()

// imports CORS
const cors = require('cors')


//give command to share data via cors

app.use(cors({
    origin:'http://localhost:4200'
}))

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

//jwtmiddleWare - to validate token

const  jwtmiddleWare =(req,res,next)=>{
    try{
        console.log('router specific middleware');
        const token = req.headers["x-access-token"]
        // validate -verify()
        const data = jwt.verify(token,'supersecrtkey12345') 
        console.log(data);
        next() 
    }
    catch{
        res.status(422).json({
            statusCode: 422,
            status:false,
            message:'Please login'
        })
       

    }
}




//register api




//post - create data
app.post('/register',(req,res)=>{
 datService.register(req.body.acno,req.body.username,req.body.password)
   .then(result=>{
    res.status(result.statusCode).json(result)

   })
})

// login
app.post('/login',(req,res)=>{
     datService.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
    })

  
    // deposit
app.post('/deposit',jwtmiddleWare,(req,res)=>{
    datService.deposit(req.body.acno,req.body.pswd,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
    })

      // withdraw
app.post('/withdraw',jwtmiddleWare,(req,res)=>{
    datService.withdraw(req.body.acno1,req.body.pswd1,req.body.amt1)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
    })

          // getTransaction
app.post('/transaction',jwtmiddleWare,(req,res)=>{
    datService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
    })

    //delete Acc
    app.delete('/deleteAcc/: acno',(req,res)=>{
        dataService.deleteAcc(req.params.acno)
        .then(result=>{
            res.status(result.statusCode).json(result)
        })
    })


//3. create port number

app.listen(3000,()=>{
    console.log("server started at port 3000");
}
)
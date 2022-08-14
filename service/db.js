// server and mongodb integration
//1. import mongoose
const mongoose =  require('mongoose')


//2. state connect string via mongoose

mongoose.connect('mongodb://localhost:27017/bankserver',{
    useNewUrlParser:true
})

//.3 define bank db model

const User = mongoose.model("User",{

    username: String,
    acno: Number,
    password: String,
    balance: Number,
    transaction: []

})

//4. export model/ collection
module.exports={
    User
}
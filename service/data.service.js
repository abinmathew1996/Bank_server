  // import jsonwebtoken
const jwt =require('jsonwebtoken')

// import db.js
const db =require('./db')

  // database
  userDetails = {
    1000: {
      username: 'max',
      acno: 1000,
      password: 1001,
      balance: 15000,
      transaction: [],
    },
    1001: {
      username: 'maxwell',
      acno: 1001,
      password: 1002,
      balance: 20000,
      transaction: [],
    },
    
    1003: {
      username: 'noir',
      acno: 1003,
      password: 1004,
      balance: 25000,
      transaction: [],
    },
  };



  //register
  const register =( acno, username, password)=> {
return db.User.findOne({acno})
.then(user=>{
  if(user){
    return {
    statusCode: 401,
    status:false,
    message:'user already exist .. please log in'
  }

  }

  else {
 const newUser = new db.User({
  username,
  acno,
  password,
  balance: 0,
  transaction: []
 })
     newUser.save()
     return {
    statusCode: 200,
    status:true,
    message:'Succesfully registered'
  }


  }
})

   

}
    
  

  //login
  const login = (acno,pswd) =>{
return db.User.findOne({
  acno,
  password:pswd
})
.then(user=>{
  if (user) {
      currentUser = user.username
      currentAcno = acno
//tocken generation
      const token =jwt.sign({currentAcno:acno},"supersecrtkey12345")
      return  {
        statusCode: 200,
        status:true,
        message:'Successfully logged in',
        token,
        currentUser,
        currentAcno
      }
    } 
    else {
      return  {
        statusCode: 401,
        status:false,
        message:'incorrect username and password'
      }
    }
  

})

  }
    
  

   //deposit
   const deposit = (acno,pswd,amt)=> {
    var amount = parseInt(amt);
    return db.User.findOne({
      acno,
      password:pswd
    }).then(user=>{
      if (user) {
          user.balance += amount;
          user.transaction.push({
            type: 'credit',
            amount,
            balance:user.balance
          })
          user.save()
          return {
            statusCode: 200,
            status:true,
            message:`${amount} credited and newBalance is ${user.balance} `
          }
        }
  
         else {
          return {
          statusCode: 401,
          status:false,
          message:'Incorrect password/ account number'
        }
        }

       
    })
    
    }
 
  

    //withdraw
    const withdraw=(acno1, pswd1, amt1)=> {
      var amount = parseInt(amt1);
  

      return db.User.findOne({
        acno:acno1,
        password:pswd1
      }).then(user=>{
        if (user) {
          if(user.balance>=amount){
            user.balance -= amount;
            user.transaction.push({
              type: 'Debit',
              amount,
              balance:user.balance
            })
            user.save()
            return {
              statusCode: 200,
              status:true,
              message:`${amount} debited and newBalance is ${user.balance} `
            }
          }
          else {
            return {
            statusCode: 401,
            status:false,
            message:'Insufficient balance'
          }
          }
          }
    
           else {
            return {
            statusCode: 401,
            status:false,
            message:'Incorrect password/ account number'
          }
          }
  
         
      })
  

    }


      // if (acno1 in userDetails) {
      //   if (pswd1 == userDetails[acno1]['password']) {
      //     if (userDetails[acno1]['balance'] >= amount) {
      //       userDetails[acno1]['balance'] -= amount;
  
      //       userDetails[acno1]['transaction'].push({
      //         type: 'debit',
      //         amount,
      //         balance:userDetails[acno1]['balance']
  
      //       });
  
      //       console.log(userDetails);
  
      //       return  {statusCode: 200,
      //       status:true,
      //       message:`${amount} debited and newBalance is ${userDetails[acno1]['balance']} `
      //     }
      //     } else {
      //       return{
      //         statusCode: 401,
      //         status:false,
      //         message:'Insufficient balance'
      //       }
      //     }
      //   } else {
      //     return {
      //       statusCode: 401,
      //       status:false,
      //       message:'In correct password'
      //     }
      //   }
      // } else {
      //   return {
      //     statusCode: 401,
      //     status:false,
      //     message:'user does not exist'
      //   }
      // }



    

    // transaction

const getTransaction = (acno)=>{
  return db.User.findOne({acno})
  .then(user=>{

    if(user){
      return {
        statusCode: 200,
        status:true,
        transaction:user['transaction']
      }
    }
  

else{
  return  {
    statusCode: 401,
    status:false,
    message:'user does not exist'
  }
}
  })
}

//deleteAcc
const deleteAcc = (acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{

    if(user){
      return {
        statusCode: 200,
        status:true,
        message:"Account deleted Successfully"
      }
    }
  

else{
  return  {
    statusCode: 401,
    status:false,
    message:'user does not exist'
  }
}
  })


}
  


  module.exports ={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }
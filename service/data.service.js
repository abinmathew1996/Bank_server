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
    if (acno in userDetails) {
      return {
        statusCode: 401,
        status:false,
        message:'user already exist .. please log in'
      }
    } else {
      userDetails[acno] = {
        username,
        acno,
        password,
        balance: 0,
        transaction: [],
      }
      console.log(userDetails);

      return {
        statusCode: 200,
        status:true,
        message:'Successfully register'
      }
    }
  }

  //login
  const login = (acno,pswd) =>{

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        currentUser = userDetails[acno]['username'];
        currentAcno = acno

        return  {
          statusCode: 200,
          status:true,
          message:'Successfully logged in'
        }
      } else {
        return  {
          statusCode: 401,
          status:false,
          message:'incorrect password'
        }
      }
    } else {
      return  {
        statusCode: 401,
        status:false,
        message:'user doesnot exist'
      }
    }
  }

   //deposit
   const deposit = (acno,pswd,amt)=> {
    var amount = parseInt(amt);

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amount;
        userDetails[acno]['transaction'].push({
          type: 'credit',
          amount,
          balance:userDetails[acno]['balance']
        })

        console.log(userDetails);

        return {
          statusCode: 200,
          status:true,
          message:`${amount} credited and newBalance is ${userDetails[acno]['balance']} `
        }

      } else {
        return {
        statusCode: 401,
        status:false,
        message:'Incorrect password'
      }
      }
    } else {
      return {
        statusCode: 401,
        status:false,
        message:'user doesnot exist'
      }
    }
  }

    //withdraw
    const withdraw=(acno1, pswd1, amt1)=> {
      var amount = parseInt(amt1);
  
      if (acno1 in userDetails) {
        if (pswd1 == userDetails[acno1]['password']) {
          if (userDetails[acno1]['balance'] >= amount) {
            userDetails[acno1]['balance'] -= amount;
  
            userDetails[acno1]['transaction'].push({
              type: 'debit',
              amount,
              balance:userDetails[acno1]['balance']
  
            });
  
            console.log(userDetails);
  
            return  {statusCode: 200,
            status:true,
            message:`${amount} debited and newBalance is ${userDetails[acno1]['balance']} `
          }
          } else {
            return{
              statusCode: 401,
              status:false,
              message:'Insufficient balance'
            }
          }
        } else {
          return {
            statusCode: 401,
            status:false,
            message:'In correct password'
          }
        }
      } else {
        return {
          statusCode: 401,
          status:false,
          message:'user does not exist'
        }
      }
    }

    // transaction

const getTransaction = (acno)=>{
  if(acno in userDetails){
  return {statusCode: 200,
    status:true,
    message:userDetails[acno]['transaction']
  }
}
else{
  return  {
    statusCode: 401,
    status:false,
    message:'user does not exist'
  }
}
}
  


  module.exports ={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }
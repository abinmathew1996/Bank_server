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

  module.exports ={
    register
  }
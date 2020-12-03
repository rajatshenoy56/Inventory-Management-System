//Equipments
const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const basicRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = basicRouter
basicRouter.get("/other_godowns",async(req,res,next) =>{
  if(req.session.email){
    res.sendFile(path.resolve('public/other_godowns.html'));
  }
  else{
    basicRedirect(res,next,"/login/form")
  }
});

basicRouter.get('/godowns',async(req,res,next)=>{
  const companyid = req.session.companyid;
  const godownid = req.session.godownid;
  const {rows} = await client.query("SELECT id,address FROM godown WHERE companyid=$1 AND id!=$2;",[companyid, godownid]);
  console.log(rows);
  res.json(rows);
  next();

})
//<---------------------------------------------------------------------------->

//logout 
basicRouter.get('/logout', function(req, res, next) {
  req.session.reset();
  basicRedirect(res,next,'/');
});

//<---------------------------------------------------------------------------->

basicRouter.get("/home",async(req,res,next) =>{
  if(req.session.email){
    res.sendFile(path.resolve('public/home.html'));
  }
  else{
    basicRedirect(res,next,"/login/form")
  }
});



//<---------------------------------------------------------------------------->
//Get information from database Endpoints

basicRouter.get('/get_godown',async(req,res,next)=>{
  const email = req.session.email;
  console.log(email)

  const {rows} = await client.query("SELECT * FROM godown WHERE inid = (SELECT uid FROM users WHERE email=$1);",[email]);
  console.log(rows);
  res.json(rows);
  next();
});

basicRouter.get('/get_users',async(req,res,next)=>{
  const email = req.session.email;
  console.log(email)

  const {rows} = await client.query("SELECT name,email FROM users WHERE email=$1;",[email]);
  console.log(rows);
  res.json(rows);
  next();
});


basicRouter.get('/sum',async(req,res,next)=>{
  const godownid = req.session.godownid;

  const {rows} = await client.query("SELECT sum(value) from sale_transaction where godownid = $1;",[godownid]);
  console.log(rows);
  res.json(rows);
  next();
})

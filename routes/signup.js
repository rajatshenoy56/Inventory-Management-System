const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const signupRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = signupRouter

// Signup Form for godown incharge
signupRouter.get("/form",async(req,res,next) =>{
  res.sendFile(path.resolve('public/signup_form.html'));
});

signupRouter.post('/',async(req,res,next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.pwd;
  const gst = req.body.gst;
  const godownaddress = req.body.godownaddress;
  req.session.godownaddress = godownaddress;
  req.session.gst = gst;
  req.session.email = email;

  client.query("INSERT INTO users(name,email,password) VALUES ($1, $2, crypt($3, gen_salt('bf', 8)));", [name, email, password]);

  const resp = await client.query("SELECT uid FROM users WHERE email =$1;",[email]);
  req.session.uid = resp.rows[0].uid;

  // Checking if company exists
  const respon = await client.query("SELECT * FROM company WHERE gst =$1;",[gst]);
  if(respon.rows.length === 1){    
    //Inserting into godown
    client.query("INSERT INTO godown(address,companyid,inid) VALUES ($1,$2,$3)",[godownaddress,respon.rows[0].id,req.session.uid]);
    basicRedirect(res,next,"/login/form")
  }
  else{   
    //add a company
    basicRedirect(res,next,"/company/form");
  }
  res.end();
  next();
});
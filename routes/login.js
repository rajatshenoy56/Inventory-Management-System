const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const loginRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = loginRouter

//Login for godown Incharge
loginRouter.get("/form",async(req,res,next) =>{
  res.sendFile(path.resolve('public/login_form.html'));
})

loginRouter.post("/",async(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.pwd;
  const { rows } = await client.query("SELECT * FROM users WHERE email = $1 AND password = crypt($2, password);",[email , password]);
  
  if(rows.length === 1) { 
    const resp = await client.query("SELECT * FROM godown WHERE inid = (SELECT uid FROM users WHERE email=$1);",[email]);
    req.session.companyid = resp.rows[0].companyid;
    req.session.godownid = resp.rows[0].id;
    req.session.email = email;
    basicRedirect(res,next,"/home")
  }
  else{
    basicRedirect(res,next,"/login/form")
  }
});

loginRouter.post('/mobile',async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const { rows } = await client.query("SELECT * FROM buyer WHERE email = $1 AND password = crypt($2, password);",[email , password]);
    
    if(rows.length === 1) { 
        res.json({message: "fine"})
    }
    else{
        res.json({message: "error"})
    }   
});

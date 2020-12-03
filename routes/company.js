const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const companyRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = companyRouter

//Company form 
companyRouter.get("/form",async(req,res,next) =>{
  res.sendFile(path.resolve('public/add_company_form.html'));
});

companyRouter.post('/add',async(req,res,next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const gst = req.session.gst;
  const uid = req.session.uid;
  const godownaddress = req.session.godownaddress

  await client.query("INSERT INTO company(name,email,address,phone,gst) VALUES ($1, $2, $3, $4, $5);", [name, email, address, phone, gst]);

  const resp = await client.query("SELECT id from company WHERE gst = $1;", [gst]);

  client.query("INSERT INTO godown(address,companyid,inid) VALUES ($1,$2,$3);",[godownaddress,resp.rows[0].id,uid]);

  basicRedirect(res,next,"/login_form");

  res.end();
  next();
});

companyRouter.get('/',async(req,res,next)=>{
  const companyid = req.session.companyid;
  console.log(companyid)

  const {rows} = await client.query("SELECT * FROM company WHERE id=$1;",[companyid]);
  console.log(rows);
  res.json(rows);
  next();
});


companyRouter.get("/details",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile('public/company_details.html' , { root : __dirname})
  }
  else{
      basicRedirect(res,next,"/login_form")
  }
});


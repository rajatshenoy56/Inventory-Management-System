const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const technicianRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = technicianRouter

technicianRouter.get("/aform",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile(path.resolve('public/add_technician_form.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
});


technicianRouter.post('add',async(req,res,next)=>{
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const godownid = req.session.godownid;
  
  client.query("INSERT INTO technician(name,address,phone,godownid) VALUES ($1, $2, $3, $4);", [name, address, phone, godownid]);
  basicRedirect(res,next,"/home");
  res.end();
  next();
});

//<---------------------------------------------------------------------------->

technicianRouter.get("/rform",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile(path.resolve('public/remove_technician_form.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
});


technicianRouter.post('/remove',async(req,res,next)=>{
  const technicianid = req.body.technicianid;
  
  client.query("DELETE FROM technician WHERE id = $1;",[technicianid]);
  basicRedirect(res,next,"/home");
  res.end();
  next();
});

//<---------------------------------------------------------------------------->

technicianRouter.get("/",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile(path.resolve('public/technician_list.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
});

technicianRouter.get('/list',async(req,res,next)=>{
  const godownid = req.session.godownid;

  const {rows} = await client.query("SELECT id, name, phone, address FROM technician where godownid=$1;",[godownid]);
  console.log(rows);
  res.json(rows);
  next();
})

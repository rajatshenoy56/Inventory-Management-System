//Equipments
const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const addEquipmentRouter = new Router()
const basicRedirect = require('./basicRedirect')
var QRCode = require('qrcode');

// export our router to be mounted by the parent application
module.exports = addEquipmentRouter

addEquipmentRouter.get("/form",async(req,res,next) =>{
  if(req.session.email){
    res.sendFile(path.resolve('public/add_equipment_form.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
});

var uri;
function saveUrl(req,url){
  uri = url;
  console.log(req.session.url)
}

addEquipmentRouter.post('/',async(req,res,next)=>{
  const name = req.body.name;
  const cost = req.body.cost;
  const quantity = req.body.quantity;
  const godownid = req.session.godownid;
  const companyid = req.session.companyid;
  
  client.query("INSERT INTO equipment(name,cost,quantity,godownid,companyid) VALUES ($1, $2, $3, $4, $5);", [name, cost, quantity, godownid, companyid]);
  QRCode.toDataURL(`Name:${name},Cost:${cost}`, function (err, url) {
      saveUrl(req,url);
  })
  basicRedirect(res,next,"/home");
  res.end();
  next();
});

addEquipmentRouter.get("/img_url",async(req,res,next)=>{
    res.json({url:uri});
    next();
})

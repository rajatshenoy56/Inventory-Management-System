const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const sellEquipmentRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = sellEquipmentRouter

sellEquipmentRouter.get("/form",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile(path.resolve('public/sell_equipment_form.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
})

sellEquipmentRouter.post('/',async(req,res,next)=>{
  const equipmentid = req.body.equipmentid;
  const buyerid = req.body.buyerid;
  const quantity = req.body.quantity;
  const sale_date = req.body.sale_date;
  const godownid = req.session.godownid;

  const {rows} = await client.query('SELECT * FROM buyer WHERE id=$1;',[buyerid]);

  if(rows.length>0)
  {
      await client.query("UPDATE equipment SET quantity = quantity - $1 WHERE id = $2;", [quantity,equipmentid]); 

      const resp = await client.query("SELECT cost from equipment WHERE id = $1;", [equipmentid]);

      client.query("INSERT INTO sale_transaction(equipmentid,buyerid,quantity,sale_date, godownid, value) VALUES ($1, $2, $3, $4,$5, $6);", [equipmentid, buyerid, quantity, sale_date,godownid,resp.rows[0].cost*quantity]);
  }
  basicRedirect(res,next,"/home");
  res.end();
  next();
})

//<---------------------------------------------------------------------------->

sellEquipmentRouter.get("/transactions",async(req,res,next) =>{
  if(req.session.email){
      res.sendFile(path.resolve('public/transactions.html'));
  }
  else{
      basicRedirect(res,next,"/login/form")
  }
});


sellEquipmentRouter.get('/transactions_list',async(req,res,next)=>{
  const godownid = req.session.godownid; 
  const {rows} = await client.query("SELECT sale_transaction.quantity quantity, equipment.cost equipment_cost, sale_transaction.equipmentid equipmentid, sale_transaction.buyerid buyerid, sale_transaction.sale_date date, buyer.name buyer_name, equipment.name equipment_name FROM sale_transaction INNER JOIN equipment ON sale_transaction.equipmentid=equipment.id INNER JOIN buyer ON sale_transaction.buyerid=buyer.id WHERE sale_transaction.godownid = $1;",[godownid]);
  console.log(rows);
  res.json(rows);
  next();

})


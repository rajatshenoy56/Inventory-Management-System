const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const editEquipmentRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = editEquipmentRouter
//<---------------------------------------------------------------------------->
editEquipmentRouter.get("/rform",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/remove_equipment_form.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});


editEquipmentRouter.post('/remove',async(req,res,next)=>{
    const equipmentid = req.body.equipmentid;
    
    client.query("DELETE FROM equipment WHERE id = $1;",[equipmentid]);
    basicRedirect(res,next,"/home");
    res.end();
    next();
});

//<---------------------------------------------------------------------------->

editEquipmentRouter.get("/change_quantity_form",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/change_quantity_form.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});


editEquipmentRouter.post('/change_quantity',async(req,res,next)=>{
    const equipmentid = req.body.equipmentid;
    const quantity = req.body.quantity;
    
    client.query("UPDATE equipment SET quantity = $1 WHERE id = $2;",[quantity, equipmentid]);
    basicRedirect(res,next,"/home");
    res.end();
    next();
});

//<---------------------------------------------------------------------------->


editEquipmentRouter.get("/change_price_form",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/change_price_form.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});


editEquipmentRouter.post('/change_price',async(req,res,next)=>{
    const equipmentid = req.body.equipmentid;
    const cost = req.body.price;
    
    client.query("UPDATE equipment SET cost = $1 WHERE id = $2;",[cost, equipmentid]);
    basicRedirect(res,next,"/home");
    res.end();
    next();
});

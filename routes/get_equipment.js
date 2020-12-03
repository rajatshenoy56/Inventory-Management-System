
const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const getEquipmentRouter = new Router()
const basicRedirect = require('./basicRedirect')
// export our router to be mounted by the parent application
module.exports = getEquipmentRouter
getEquipmentRouter.get("/details",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/equipment_details.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});

getEquipmentRouter.get('/',async(req,res,next)=>{
    const godownid = req.session.godownid;

    const {rows} = await client.query("SELECT * FROM equipment WHERE godownid =$1;",[godownid]);
    console.log(rows);
    res.json(rows);
    next();
});

getEquipmentRouter.get('/:id',async(req,res,next)=>{
    const godownid = req.session.godownid;

    const {rows} = await client.query("SELECT * FROM equipment WHERE godownid =$1 AND id =$2;",[godownid, req.params.id]);
    console.log(rows);
    res.json(rows);
    next();

})

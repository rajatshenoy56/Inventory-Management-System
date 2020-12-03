const Router = require('express-promise-router')
const client = require('../db')
const path = require('path');
const buyerRouter = new Router()
const basicRedirect = require('./basicRedirect')

module.exports = buyerRouter

buyerRouter.get("/aform",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/add_buyer_form.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});


buyerRouter.post('/add',async(req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const godownid = req.session.godownid;

    client.query("INSERT INTO buyer(name,email,password,godownid) VALUES ($1, $2, crypt($3, gen_salt('bf', 8)), $4);", [name, email, password, godownid]);
    basicRedirect(res,next,"/home");
    res.end();
    next();
});

//<---------------------------------------------------------------------------->

buyerRouter.get('/list',async(req,res,next)=>{
    const godownid = req.session.godownid;

    const {rows} = await client.query("SELECT id, name, phone, address FROM buyer WHERE godownid = $1;",[godownid]);
    console.log(rows);
    res.json(rows);
    next();
})

buyerRouter.get("/",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/buyer_list.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});
//<---------------------------------------------------------------------------->

buyerRouter.get("/rform",async(req,res,next) =>{
    if(req.session.email){
        res.sendFile(path.resolve('public/remove_buyer_form.html'));
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});


buyerRouter.post('/remove',async(req,res,next)=>{
    const buyerid = req.body.buyerid;
    
    client.query("DELETE FROM buyer WHERE id = $1;",[buyerid]);
    basicRedirect(res,next,"/home");
    res.end();
    next();
});
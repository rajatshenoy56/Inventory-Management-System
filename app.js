const express = require('express')
const bodyParser = require('body-parser');
var session = require('client-sessions');
const basicRedirect = require('./routes/basicRedirect')

const mountRoutes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
app.listen(PORT,function(){
    console.log("listening at port"+ PORT);
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

//for sessions
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

mountRoutes(app)

//restricting static files
app.get("/*.html", async(req,res,next)=>{
    if(req.session.email){
        basicRedirect(res,next,"/home")
    }
    else{
        basicRedirect(res,next,"/login/form")
    }
});

app.get("/", async (req,res,next) =>{
    basicRedirect(res,next,"/login/form")
});



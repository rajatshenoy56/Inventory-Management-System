// common redirect function
const basicRedirect = (res,next,redirectTo) =>{
    res.redirect(redirectTo);
    next();
}

module.exports = basicRedirect
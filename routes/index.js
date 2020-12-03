const basic = require('./basic')
const login = require('./login')
const signup = require('./signup')
const company = require('./company')
const buyer = require('./buyer')
const technician = require('./technician')
const add_equipment = require('./add_equipment')
const get_equipment = require('./get_equipment')
const edit_equipment = require('./edit_equipment')
const sell_equipment = require('./sell_equipment')
const maintenance = require('./maintenance')

module.exports = app => {
  app.use('',basic);
  app.use('/login', login);
  app.use('/signup',signup);
  app.use('/company',company);
  app.use('/equipment',add_equipment);
  app.use('/get_equip',get_equipment);
  app.use('/edit_equip',edit_equipment);
  app.use('/sell_equip',sell_equipment);
  app.use('/buyer',buyer);
  app.use('/technician',technician);
  app.use('/maintenance',maintenance);
  // etc..
}
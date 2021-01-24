const express = require('express');
const router = express.Router();
const symbols = require('../models/Symbols')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/price/:symbol',function (req,res,next) {
  let symbol = req.params.symbol;
  console.log('/price/'+symbol+' added');
  const j = schedule.scheduleJob('*/5 * * * * *',function () {
    symbols.find({}).then((r)=>{
      for (let obj in r){

      }
    })
    insertPriceToKafka.insertPriceToKafka(symbol)
  })

})

module.exports = router;

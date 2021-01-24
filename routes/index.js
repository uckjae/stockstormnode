var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/price/:symbol',function (req,res,next) {
  let symbol = req.params.symbol;
  console.log('/price/'+symbol+' added');
  const j = schedule.scheduleJob('*/5 * * * * *',function () {
    insertPriceToKafka.insertPriceToKafka(symbol)
  })

})

module.exports = router;

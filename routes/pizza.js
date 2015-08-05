var express = require('express');
var router = express.Router();

//old way using the routes
// router.get('/:topping/:qty', function (req, res) {
//   var obj = req.params;

//   res.render('templates/pizza', obj);
// });


//new way using query parameters
router.get('/', function (req, res) {
  //notcie req.params became req.query
  var obj = {
    qty: req.query.qty || 1;
    topping: req.query.topping || 'cheese'
  };

  res.render('templates/pizza', obj);
});

module.exports = router;

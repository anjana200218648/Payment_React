const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/cards', controller.getcards);
router.post('/createcards', controller.addcards);
router.post('/updatecards', controller.updatecards);
router.post('/deletecards', controller.deletecards);



router.get('/dpayment', controller.getdpayment);
router.post('/createdpayment', controller.adddpayment);
router.post('/updatedpayment', controller.updatedpayment);
router.post('/deletedpayment', controller.deletedpayment);

router.get('/bpayment', controller.getbpayment);
router.post('/createbpayment', controller.addbpayment);
router.post('/updatebpayment', controller.updatebpayment);
router.post('/deletebpayment', controller.deletebpayment);

router.get('/cards/total', controller.getCardTotal);
router.get('/dpayment/total', controller.getDirectPaymentTotal);
router.get('/bpayment/total', controller.getBankPaymentTotal);



module.exports = router;

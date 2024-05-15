const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    card: String,
    cname: String,
    cvv: String,
    email: String,
    exdate: String,
    product:{
        type: String,
        required:true
    },
    orderQuantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },

    createdAt: { type: Date, default: Date.now }
   
});


const directpaymentSchema = new Schema ({
   name: String,
   rgname: String,
   cemail: String,
   contactnumber: String,
   product:{
    type: String,
    required:true
},
orderQuantity:{
    type:Number,
    required:true
},
amount:{
    type:Number,
    required:true
},
   createdAt: { type: Date, default: Date.now }
});

const bankpaymentSchema = new Schema ({
    email: String,
    accountnumber: String,
    slip: String,
    product:{
        type: String,
        required:true
    },
    orderQuantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    createdAt: { type: Date, default: Date.now }
    
 });

const dpayment = mongoose.model('dpayment', directpaymentSchema);
const Card = mongoose.model('Card', cardSchema);
const bpayment = mongoose.model('bpayment', bankpaymentSchema);

module.exports = { Card, dpayment,bpayment };

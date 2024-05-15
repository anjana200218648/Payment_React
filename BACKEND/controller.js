const { Card, dpayment,bpayment } = require("../../models/Anjana/model")

const getcards = (req, res) => {
    Card.find()
        .sort({ createdAt: -1 }) 
        .limit(1) 
        .then(cards => {
            res.json(cards);
        })
        .catch(error => {
            res.json({ message: error });
        });
};


const addcards = (req, res) => {
    const { card, cname, exdate, cvv, email,amount,product,orderQuantity } = req.body;
    const newCard = new Card({
        card,
        cname,
        cvv,
        email,
        exdate,
        amount,
        product,
        orderQuantity
    });

    newCard.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ message: error });
        });
};

const updatecards = (req, res) => {
    const { card: cardNumber, cname, exdate, cvv, email,amount } = req.body;
    Card.updateOne({ card: cardNumber }, { $set: { card: cardNumber, cname, exdate, cvv, email,amount } })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ message: error });
        });
};

const deletecards = (req, res) => {
    const { card: cardNumber } = req.body;
    Card.deleteOne({ card: cardNumber })
        .then(response => {
            res.json({ message: "Card deleted successfully", response });
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting card", error });
        });
};




const getdpayment = (req, res) => {
    const { email } = req.query;
    const query = email ? { cemail: email } : {};

    
    dpayment.find(query)
        .sort({ createdAt: -1 })
        .then(dpayments => {
            res.json(dpayments);
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};

const adddpayment = (req, res) => {
    const { name, rgname, cemail, contactnumber, amount,product,orderQuantity } = req.body;
    
    
    const newDpayment = new dpayment({
        name,
        rgname,
        cemail,
        contactnumber,
        amount,
        product,
        orderQuantity
    });

    
    newDpayment.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ message: "Error adding payment", error });
        });
};


const updatedpayment = (req, res) => {
    const { name: cname, rgname, cemail, contactnumber, amount } = req.body;
    dpayment.updateOne({ name: cname }, { $set: { rgname, cemail, contactnumber, amount } })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ message: error });
        });
};

const deletedpayment = (req, res) => {
    const { name: cname } = req.body;
    dpayment.deleteOne({ name: cname })
        .then(response => {
            res.json({ message: "Payment deleted successfully", response });
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting payment", error });
        });
};

//bank payment

const getbpayment = (req, res) => {
    
    bpayment.find()
        .sort({ createdAt: -1 })
        .then(bpayments => {
            res.json(bpayments);
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};

const addbpayment = (req, res) => {
    const { email, accountnumber, amount, slip,product,orderQuantity } = req.body;
    const newbpayment = new bpayment({
        email,
        accountnumber,
        amount,
        slip,
        product,
        orderQuantity
       
    });

    newbpayment.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ message: error });
        });
};

const updatebpayment = (req, res) => {
    const { email: email, accoutnumber, amount, slip } = req.body;
    bpayment.updateOne({ email: email }, { $set: { email: email, accoutnumber, amount, slip } })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ message: error });
        });
};

const deletebpayment = (req, res) => {
    const { email: email } = req.body;
    bpayment.deleteOne({ email: email })
        .then(response => {
            res.json({ message: "bank payment deleted successfully", response });
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting card", error });
        });
};

const getCardTotal = async (req, res) => {
    try {
        const total = await Card.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: { $toDouble: "$amount" } } // Assuming 'amount' is the field containing the amount
                }
            }
        ]);
        res.json(total[0] ? total[0].totalAmount : 0);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getDirectPaymentTotal = async (req, res) => {
    try {
        const total = await dpayment.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: { $toDouble: "$amount" } } 
                }
            }
        ]);
        res.json(total[0] ? total[0].totalAmount : 0);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getBankPaymentTotal = async (req, res) => {
    try {
        const total = await bpayment.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: { $toDouble: "$amount" } } 
                }
            }
        ]);
        res.json(total[0] ? total[0].totalAmount : 0);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = { getcards, addcards, updatecards, deletecards, getdpayment, adddpayment, updatedpayment, deletedpayment, getbpayment, addbpayment, updatebpayment, deletebpayment,getCardTotal, getDirectPaymentTotal, getBankPaymentTotal
 };

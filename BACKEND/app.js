const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Controller = require('./controller'); 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ 
    verify: (req, res, buf) => {
        console.log("Raw request body:", buf.toString());
    }
}));

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_secret_key'
}, async (jwtPayload, done) => {
    try {
       
    } catch (error) {
        return done(error, false);
    }
}));

app.use(passport.initialize());

// Routes
app.get('/cards', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.getcards(req, res);
});

app.post('/createcards', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.addcards(req, res);
});

app.post('/updatecards', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.updatecards(req, res);
});

app.post('/deletecards', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.deletecards(req, res);
});

// Direct payment

app.get('/dpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.getdpayment(req, res);
});

app.post('/createdpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.adddpayment(req, res);
});

app.post('/updatedpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.updatedpayment(req, res);
});

app.post('/deletedpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.deletedpayment(req, res);
});


// Bank payment

app.get('/bpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.getbpayment(req, res);
});

app.post('/createbpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.addbpayment(req, res);
});

app.post('/updatebpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.updatebpayment(req, res);
});

app.post('/deletebpayment', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Controller.deletebpayment(req, res);
});

module.exports = app;

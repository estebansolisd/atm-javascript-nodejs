const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const monk = require('monk');
const db = monk('localhost/user');
const db = monk('localhost/connectedUser');
const connectedUser = db.get('connectedUser');
const users = db.get('users');
//Validating the data
const isValidNew = user => user.username && user.username.toString().trim() !== '' && user.password && user.password.toString().trim()
//Some settings for the json
app.use(cors());
app.use(express.json());
//Static files
app.use(express.static(path.join(__dirname, 'public')));
//--Get and Set
app.get('/public', (req, res) => {
    res.json({
        message: 'Hello'
    });
});
app.get('/users', (req,res) => {
    users.find()
    .then(users => {
        res.json(users);
    })
})
app.post('/users', (req, res) => {
    if (isValidNew(req.body)) {
        const User = {
            username: req.body.username.toString(),
            password: req.body.password.toString(),
            money: req.body.money.toString(),
            created: new Date()
        }
        users
            .insert(User)
            .then(createdUser => {
                res.json(createdUser);
            });
        console.log(User);
        console.log('Insert to db');
    } else {
        res.status(422);
        res.json({
            message: 'Hey! username and password are required'
        });
    }
})
app.post('/updateUsers', (req, res) => {
    users.update({ _id: req.body.id }, { $set:
        { "money": req.body.money.toString() } },  (err)  => {
          console.log(err);
        }).then(console.log('Update user db'));
})
//Settings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
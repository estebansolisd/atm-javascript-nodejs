const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const monk = require('monk');
const db = monk('localhost/user');
const dbConnected = monk('localhost/connectedUser');
const connectedUser = dbConnected.get('connectedUser');
const users = db.get('users');
// For remove all data connectedUser.remove( { } )
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
app.get('/getId', (req,res) => {
    connectedUser.find()
    .then(conUser => {
        res.json(conUser);
    })
})
app.post('/checkMoney', (req,res) => {
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    users.find({_id: req.body[Object.size(req.body) -1]['id']}, { fields: { money: 1 } }) // equivalent
    .then(conUser => {
        res.json(conUser);
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
app.get('/connectedUser', (req,res) => {
    connectedUser.find()
    .then(conUser => {
        res.json(conUser);
    })
})
app.post('/connectedUser', (req, res) => {
    const conUser = {
        id: req.body.id
    }
    if (req.body.id !== '') {
        connectedUser
            .insert(conUser)
            .then(conUsers => {
                res.json(conUsers);
            });
        console.log('Connected user inseted');
    } else {
        res.status(422);
        res.json({
            message: 'Hey! id is null'
        });
    }
})
app.post('/updateUsers', (req, res) => {
    users.update({ _id: req.body.id }, { $set:
        { "money": req.body.money.toString() } },  (err)  => {
          console.log(err);
        }).then(console.log('Update user db'));
})
app.post('/updateUsersMoney', (req, res) => {
    let money = users.find({_id: req.body.id}, { fields: { money: 1 } });
    console.log(money)
    users.update({ _id: req.body.id }, { $set:
        { "money":  money - req.body.money }}
        )
})
//Settings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
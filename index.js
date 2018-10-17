const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const monk = require('monk');
const db = monk('ifallinmeat:Cookies890@ds235243.mlab.com:35243/user' || 'localhost/user');
const dbConnected = monk('ifallinmeat:Cookies890@ds135233.mlab.com:35233/connecteduser' || 'localhost/connecteduser');
const connectedUser = dbConnected.get('connectedUser');
const users = db.get('users');
/** For remove all data*/
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
app.get('/users', (req, res) => {
    users.find()
        .then(users => {
            res.json(users);
        })
})
app.get('/getId', (req, res) => {
    connectedUser.find()
        .then(conUser => {
            res.json(conUser);
        })
})
app.post('/checkMoney', (req, res) => {
    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    users.find({ _id: req.body[Object.size(req.body) - 1]['id'] }, { fields: { money: 1 } }) // equivalent
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
app.get('/connectedUser', (req, res) => {
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
            .remove({}, () => {
                connectedUser
                    .insert(conUser)
                    .then(conUsers => {
                        res.json(conUsers);
                    })
            })
        console.log('Connected user inseted');
    } else {
        res.status(422);
        res.json({
            message: 'Hey! id is null'
        });
    }
})
app.post('/updateUsers', (req, res) => {
    users.find({ _id: req.body.depositId }, { fields: { money: 1 } })
        .then(money => {
            console.log(req.body.depositId);         
            const newMoney = isNaN(money[0]['money']) ? 0 : money[0]['money'];
            users.update({ _id: req.body.depositId }, {
                $set:
                    { "money": parseInt(newMoney)  + parseInt(req.body.money) }
            }
            ).then(
                users.find({ _id: req.body.id }, { fields: { money: 1 } })
                    .then(money => {
                        const newMoney = isNaN(money[0]['money']) ? 0 : money[0]['money'];
                        users.update({ _id: req.body.id }, {
                            $set:
                                { "money": newMoney - req.body.money }
                        }
                        )
                    })
            )
        })
})
app.post('/updateUsersMoney', (req, res) => {
    users.find({ _id: req.body.id }, { fields: { money: 1 } })
        .then(money => {
            const newMoney = isNaN(money) ? 0 : money;
            console.log(newMoney);
            console.log(req.body.money);

            users.update({ _id: req.body.id }, {
                $set:
                    { "money": newMoney - req.body.money }
            }
            )
        })
})
//Settings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
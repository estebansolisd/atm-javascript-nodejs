const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
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
app.post('/users', (req, res) => {
    if (isValidNew(req.body)) {
        const User = {
            username: req.body.username.toString(),
            password: req.body.password.toString(),
            money: req.body.money.toString()
        }
        console.log(User);
        console.log('Insert to db');
    } else {
        res.status(422);
        res.json({
            message: 'Hey! username and password are required'
        });
    }
})
//Settings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
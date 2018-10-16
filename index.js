const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
//Static files
app.use(express.static(path.join(__dirname,'public')));
//--Get and Set
app.get('/public', (req,res) =>{
    res.json({
        message: 'Hello'
    });
});
app.post('/users',(req,res) =>{
    console.log(req.body);
})
//Settings
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})
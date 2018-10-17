const API = window.location.hostname == 'localhost' ? `http://localhost:3000/checkMoney` : `https://atm-javascript.herokuapp.com/checkMoney` ;
const LASTID = window.location.hostname == 'localhost' ? `http://localhost:3000/getId` : `https://atm-javascript.herokuapp.com/getId` ;
window.onload = () => {
    fetch(LASTID)
        .then(response => response.json())
        .then(conUser => {
            fetch(API, {
                method: 'POST',
                body: JSON.stringify(conUser),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => response.json())
                .then(createdUser => {
                    console.log(createdUser);
                    $('#money').html(createdUser[0]['money']);;
                })
        });
}
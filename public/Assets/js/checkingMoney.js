const API = 'http://localhost:3000/checkMoney'
const LASTID = 'http://localhost:3000/getId'
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
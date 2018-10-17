var URL = 'http://localhost:3000/updateUsers';
var URLM = 'http://localhost:3000/updateUsersMoney';
const LASTID = 'http://localhost:3000/getId';
var hiddenItem = '#hiddenItem';
const SelectedItem = num => {
    hiddenItem += num;
    $('#dropdownMenu2').html($(`#cmbItem${num}`).html());
}

const Submited = (msg) => {
    bootbox.confirm({
        message: msg == 0 ? `Do you really wan't to deposit to this user?` : `Do you really wan't to windraw ${$('#numberMoney').val()} $`,
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-secondary'
            },
            cancel: {
                label: 'No',
                className: 'btn-light'
            }
        },
        callback: result => {

            if (result) {
                if (msg == 0) {
                    const moneyDeposit = $('#moneyDeposit').val();
                    //Setting the objects
                    fetch(LASTID)
                    .then(response => response.json())
                    .then(conUser => {
                        const UserDeposit = {
                            id: conUser[0]['id'],
                            depositId: $(hiddenItem).val(),
                            money: moneyDeposit
                        }
                        fetch(URL, {
                            method: 'POST',
                            body: JSON.stringify(UserDeposit),
                            headers: {
                                'content-type': 'application/json'
                            }
                        }).then(bootbox.alert({ message: msg == 0 ? 'Deposited 😄' : 'Windrawed 😄' }))
                    });
                    /**
                    const User = {
                        money: moneyDeposit,
                        id: $(hiddenItem).val()
                    }
                    fetch(URL, {
                        method: 'POST',
                        body: JSON.stringify(User),
                        headers: {
                            'content-type': 'application/json'
                        }
                    }).then(
                        bootbox.alert({
                            message: msg == 0 ? 'Deposited 😄' : 'Windrawed 😄'
                        })
                    )*/
                } else {
                    const moneyWindraw = $('#numberMoney').val();
                    //Setting the objects
                    fetch(LASTID)
                        .then(response => response.json())
                        .then(conUser => {
                            const UserWindraw = {
                                id: conUser[0]['id'],
                                money: moneyWindraw
                            }
                            fetch(URLM, {
                                method: 'POST',
                                body: JSON.stringify(UserWindraw),
                                headers: {
                                    'content-type': 'application/json'
                                }
                            }).then(bootbox.alert({ message: msg == 0 ? 'Deposited 😄' : 'Windrawed 😄' }))
                        });
                }
            }
        }
    });
}

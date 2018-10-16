var URL = 'http://localhost:3000/updateUsers';
var hiddenItem = '#hiddenItem';
const SelectedItem = num => {
    hiddenItem += num; 
    $('#dropdownMenu2').html($(`#cmbItem${num}`).html());
}

const Submited = (msg) => {
    bootbox.confirm({
        message: msg == 0  ? `Do you really wan't to deposit to this user?` : `Do you really wan't to windraw ${$('#numberMoney').val()} $`,
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
                const moneyDeposit = $('#moneyDeposit').val();
                //Setting the objects
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
                })
                bootbox.alert({
                    message: 'Deposited 😄'
                });
            } 
        }
    });
}

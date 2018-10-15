window.onload = () => {
    let persons = ['kenda', 'loco', 'jolines']; //USERS xD
    let count = 0;
    persons.forEach(element => {
        $('#cmbMenu').html($('#cmbMenu').html() + `<button class="dropdown-item" id="cmbItem${count}"type="button" onclick="SelectedItem(${count})">${element}</button>`)
        count++;
    });

}
const SelectedItem = num => {
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
            console.log('This was logged in the callback: ' + result);
        }
    });
}

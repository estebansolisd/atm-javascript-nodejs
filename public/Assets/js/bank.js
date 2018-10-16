var API_URL = 'http://localhost:3000/users'
const menuLocation = location => window.location = location;
window.onload = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            console.log('The object of users');
            console.log(users);
            let count = 0;
            users.forEach(element => {
                $('#cmbMenu').html($('#cmbMenu').html() + `<button class="dropdown-item" id="cmbItem${count}" type="button" onclick="SelectedItem(${count})">${element['username']}</button>`)
                $('#cmbMenu').html($('#cmbMenu').html() + `<input type="hidden" id="hiddenItem${count}" value="${element['_id']}">`)
                count++;
            });
        });
}
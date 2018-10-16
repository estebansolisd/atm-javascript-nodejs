var API_URL = 'http://localhost:3000/users'
const showRegisterForm = () => {
    $('#second-child').fadeIn('slow', () => {
        $('#second-child').css('display', 'flex');
    });
    $('.remove').fadeOut('slow', () => {
        $.when($('.remove').remove()).then(
            $('#first-child').html(
                `
                <a href="index.html"><img src="Assets/img/bn.png" alt="" srcset=""></a>
                <form id="registerForm" class="remove2">
                    <input class="remove2" id="Registerusername" type="text" placeholder="Write your username.."
                        autocomplete="username" autocomplete="email">
                    <input class="remove2" id="Registerpassword1" type="password" placeholder="Write your password.."
                        autocomplete="current-password">
                    <input class="remove2" id="Registerpassword2" type="password" placeholder="Confirm your password.."
                        autocomplete="current-password">
                    <input class="remove2" id="register2" type="button" value="Ready" onclick="register();">
                </form>
                `
            )
        ).then(

            $('#registerForm')
                .css("display", "flex", () => {
                    $('#registerForm').fadeIn('slow')
                })
                .css("height", "inherit", () => {
                    $('#registerForm').fadeIn('slow')
                })
                .css("margin", "0%", () => {
                    $('#registerForm').fadeIn('slow')
                })
                .css("justify-content", "space-evenly", () => {
                    $('#registerForm').fadeIn('slow')
                })
                .css("align-items", "center", () => {
                    $('#registerForm').fadeIn('slow')
                })
                .css("flex-direction", "column", () => {
                    $('#registerForm').fadeIn('slow')
                })

        );
    });

}
const register = () => {
    if ($('#Registerusername').val() !== '' && $('#Registerpassword1').val() !== '' && $('#Registerpassword2').val() !== '') {
        if ($('#Registerpassword1').val() !== $('#Registerpassword2').val()) {
            bootbox.alert({
                message: 'Check your password'
            });
        } else {
            //Getting the data
            const username = $('#Registerusername').val();
            const password = $('#Registerpassword1').val();
            //Setting the objects
            const User = {
                username,
                password,
                money: ''
            }
            fetch(API_URL,{
                method: 'POST',
                body: JSON.stringify(User),
                headers:{
                    'content-type':'application/json'
                }
            })
            console.log(User);
            bootbox.alert({
                message: 'Saved 😄'
            });
        }
    } else {
        bootbox.alert({
            message: 'Complete the fields'
        });
    }
}
const removeRegister = () => {
    $('.remove2').fadeOut('slow', () => {
        $('.remove2').remove();
        $('#first-child').html(
            `
            <a href="index.html"><img src="Assets/img/bn.png" alt="" srcset=""></a>
            <form id="registerForm" class="remove2">
                <input class="remove2" id="Registerusername" type="text" placeholder="Write your username.."
                    autocomplete="username" autocomplete="email">
                <input class="remove2" id="Registerpassword1" type="password" placeholder="Write your password.."
                    autocomplete="current-password">
                <input class="remove2" id="Registerpassword2" type="password" placeholder="Confirm your password.."
                    autocomplete="current-password">
                <input class="remove2" id="register2" type="button" value="Ready" onclick="register();">
            </form>
            <form class="form remove">
                <input class="remove" id="username" type="text" placeholder="Write your username.." autocomplete="username"
                    autocomplete="email">
                <input class="remove" id="password" type="password" placeholder="Write your password.." autocomplete="current-password">
                <input class="remove" id="login" type="button" value="Login">
                <input class="remove" id="register" type="button" value="Register" onclick="showRegisterForm();">
            </form>
            `
        );
    });
    $('#second-child').fadeOut('slow', () => {
        $('#second-child').css('display', 'none');
    });

}

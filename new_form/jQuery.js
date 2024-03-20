// dom elements

const form = document.getElementById('form')
const first_name = document.getElementById('first_name')
const last_name = document.getElementById('last_name')
const email = document.getElementById('email')
const phone_number = document.getElementById('phone_number')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm_password')

//show success

function showError(input, msg) {
    const formControl = input.parentElement
    formControl.className = "form-control error";

    const small = formControl.querySelector('small')
    small.innerText = msg
}

function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = "form-control success";
}

function checkRequired(inputArray) {
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            showError(input, '${input.id} is required')
        }
        else{
            showSuccess(input)
        }
    });
}

//check input

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, '${input.id} at least ${min} charactes')
    }
    else if(input.value.length > max){
        showError(input, '${input.id} at most ${max} charactes')
    }
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1.3}\.[0-9]{1.3}\.[0-9]{1.3}\.[0-9]{1.3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input, "Email is not valid")
    }
}

//match password

function ispasswordMatch(p1,p2) {
    if(p1.value != p2.value) {
        showError(p2, "do not match")
    }
}
// add event listener

form.addEventListener('submit', function (e) {
    
    e.preventDefault()

    checkRequired([first_name,last_name,email,phone_number,password,confirm_password])

    checkLength(first_name, 2, 25)
    checkLength(password, 6, 20)
    checkLength(phone_number, 10, 11)

    checkEmail(email)

    ispasswordMatch(password, confirm_password)

    const allInputsValid = document.querySelectorAll('.form-control.success').length === 6;
    if (allInputsValid) {
        const formData = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            phone_number: phone_number.value
        };

        const queryString = Object.keys(formData).map(key => key + '=' + encodeURIComponent(formData[key])).join('&');

        window.location.href = 'sayfa2.html?' + queryString;
    }

})


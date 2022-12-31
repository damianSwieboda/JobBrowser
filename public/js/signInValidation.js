let isNameValid = false
let isEmailValid = false
let isPasswordValid = false
let isRepeatedPasswordValid = false

submitButton.setAttribute('disabled', true)

document.addEventListener('input', ()=>{
    switchOffAndOnFormButton()
    
    validateName(nameInput.value)
    validateEmail(emailInput.value)
    validatePassword(passwordInput.value)
    repeatedPasswordValidation(passwordInput.value, repeatedPasswordInput.value)
})

document.addEventListener('click', ()=>{
    switchOffAndOnFormButton()    
})

function switchOffAndOnFormButton() {
    if(isNameValid && isEmailValid && isPasswordValid && isRepeatedPasswordValid) {
        submitButton.removeAttribute('disabled')
    } else {
        submitButton.setAttribute('disabled', true)
    }
}

function validateName(nameValue) {
    if(nameValue.trim().length >= 2){
        isNameValid = true
    } else {
        isNameValid = false
    }
}


function validateEmail(emailValue) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailValue.trim().match(mailformat)) {
        isEmailValid = true
    } else {
        isEmailValid = false
    }
}


function validatePassword(passwordValue) {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/

    if(passwordValue.trim().match(passwordFormat)){
        isPasswordValid = true
    } else {
        isPasswordValid = false
    }
}

function repeatedPasswordValidation(firstPassword, repeatedPassword){
    if(firstPassword === repeatedPassword){
        isRepeatedPasswordValid = true
    } else {
        isRepeatedPasswordValid = false
    }
}


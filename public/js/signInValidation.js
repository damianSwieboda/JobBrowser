let isValid = {
  name: false,
  email: false,
  password: false,
  repeatedPassword: false
}


document.addEventListener('change', () => {
    isValid.name = validateName(nameInput.value)
    isValid.email = validateEmail(emailInput.value)
    isValid.password = validatePassword(passwordInput.value)
    isValid.repeatedPassword = repeatedPasswordValidation(passwordInput.value, repeatedPasswordInput.value)
})

submitButton.addEventListener('click', ()=>{
    if(Object.values(isValid).every(v => v === true)) {
        form.submit()
    }
})


function validateName(nameValue) {
    if(nameValue.trim().length >= 2){
        return true
    } else {
        return false
    }
}

function validateEmail(emailValue) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailValue.trim().match(mailformat)){
        return true
    } else {
        return false
    }
}

function validatePassword(passwordValue) {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
    if(passwordValue.trim().match(passwordFormat)){
        return true
    } else {
        return false
    }
  
}

function repeatedPasswordValidation(firstPassword, repeatedPassword) {
  if(firstPassword === repeatedPassword){
    return true
  } else {
    return false
  }
}

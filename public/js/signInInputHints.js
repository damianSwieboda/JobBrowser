const nameInput = document.querySelector('#nameInput')
const emailInput = document.querySelector('#emailInput')
const passwordInput = document.querySelector('#passwordInput')
const repeatedPasswordInput = document.querySelector('#repeatedPasswordInput')

const nameComment = document.querySelector('#nameComment')
const emailComment = document.querySelector('#emailComment')
const passwordComment = document.querySelector('#passwordComment')
const repeatedPasswordComment = document.querySelector('#repeatedPasswordComment')

const form = document.querySelector('#registerForm')


document.addEventListener('click', (event) => {
    displayErrorComment(nameInput, nameComment, validations.name)
    displayErrorComment(emailInput, emailComment, validations.email)
    displayErrorComment(passwordInput, passwordComment, validations.password)
    displayErrorComment(repeatedPasswordInput, repeatedPasswordComment, validations.repeatedPassword)
});

function displayErrorComment(input, inputComment, isError){

    if (input.contains(event.target)) {
        inputComment.style.display = 'inline-block' 
    } else {
        inputComment.style.display = 'none' 
    }

    if(isError === false && input.contains(event.target) == false && input.value.length > 0){
        inputComment.style.display = 'inline-block' 
        inputComment.style.color = 'red'
        input.style.border= '2px solid red'
    } else {
        input.style.border= '1px solid rgb(108, 108, 108)'
        inputComment.style.color = 'rgb(184, 184, 184)'

    }
}
const nameInput = document.querySelector('#nameInput')
const emailInput = document.querySelector('#emailInput')
const passwordInput = document.querySelector('#passwordInput')
const repeatedPasswordInput = document.querySelector('#repeatedPasswordInput')

const nameComment = document.querySelector('#nameComment')
const emailComment = document.querySelector('#emailComment')
const passwordComment = document.querySelector('#passwordComment')
const repeatedPasswordComment = document.querySelector('#repeatedPasswordComment')


document.addEventListener('click', (event) => {   
    displayErrorComment(nameInput, nameComment, isNameValid)
    displayErrorComment(emailInput, emailComment, isEmailValid)
    displayErrorComment(passwordInput, passwordComment, isPasswordValid)
    displayErrorComment(repeatedPasswordInput, repeatedPasswordComment, isRepeatedPasswordValid)
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
        input.style.border= '0px'

    }
}
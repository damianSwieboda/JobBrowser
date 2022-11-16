const nameInput = document.querySelector('#nameInput')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const secondPassword = document.querySelector('#secondPassword')

const nameComment = document.querySelector('#nameComment')
const emailComment = document.querySelector('#emailComment')
const passwordComment = document.querySelector('#passwordComment')
const secondPasswordComment = document.querySelector('#secondPasswordComment')


document.addEventListener('click', (event) => {   
    displayCommentToFocusedElement(nameInput, nameComment)
    // displayCommentToFocusedElement(email, emailComment)
    displayCommentToFocusedElement(password, passwordComment)
    displayCommentToFocusedElement(secondPassword, secondPasswordComment)
});

function displayCommentToFocusedElement(focusedInput, commentContainer){
    if (focusedInput.contains(event.target)) {
        commentContainer.style.display = 'inline-block' 
    } else {
        commentContainer.style.display = 'none' 
    }
}

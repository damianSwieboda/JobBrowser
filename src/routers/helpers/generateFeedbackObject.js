function generateErrorFeedback(error){
    const signInFeedback = {
        messages: [],
    }

    const keys = Object.keys(error.errors)
    

    keys.forEach((key) => {
        signInFeedback.messages.push(error.errors[key].message)  
        signInFeedback[key+'InputBackgroundColor'] = 'red'
    })

    return signInFeedback
}


const signInSuccesfulFeedback = {
    messages: ['Succesfully Sign in!'],
    border: 'green',
    background: '#84ff84'
}


const logInErrorFeedback = (message) => {
    return {
        messages: [message],
        border: 'red',
        background: '#ff6969'
    
    }

}




module.exports = { generateErrorFeedback, signInSuccesfulFeedback, logInErrorFeedback }

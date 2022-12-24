function generateErrorObjectToRenderForPUG(error){
    const registerErrorObject = {
        title: 'Sign in',
        errorMessages: [],
    }

    const keys = Object.keys(error.errors)

    keys.forEach((key) => {
        registerErrorObject.errorMessages.push(error.errors[key].message)  
        registerErrorObject[key+'InputBackgroundColor'] = 'red'
    })

    return registerErrorObject
}

module.exports = { generateErrorObjectToRenderForPUG }

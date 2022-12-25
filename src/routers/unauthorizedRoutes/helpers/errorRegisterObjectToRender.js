function generateErrorObjectToRenderForPUG(error){
    const registerErrorObject = {
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

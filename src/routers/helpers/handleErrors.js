

function handleValidationErrors(error, req, res){
    const providedEmail = req.body.email

    const providedName = req.body.name


 
   if(error.status === 400 || error.status === 401){
    console.log(error.status)
        return res.status(error.status).render('unauthorizedViews/register', {isUnauthorizedView: true, providedName, providedEmail, ...error})
    }
    
    if(error.status === 403){
        return res.status(403).render('unauthorizedViews/login', {isUnauthorizedView: true, providedEmail, ...error})
    }

    if(error.name === 'ValidationError'){
        const signInFeedback = convertDatabaseErrorToFeedback(error)
        return res.status(400).render('unauthorizedViews/register', {isUnauthorizedView: true, providedEmail, providedName, ...signInFeedback})
    }
    if(error.name = 'AuthenticationError'){
        return res.status(400).render('unauthorizedViews/login', {isUnauthorizedView: true, providedEmail, ...error})
    }

}



function convertDatabaseErrorToFeedback(error){
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

module.exports = { handleValidationErrors }
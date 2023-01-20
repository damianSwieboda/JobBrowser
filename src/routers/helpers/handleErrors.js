

function handleValidationErrors(error, req, res){
    const providedEmail = req.body.email
    const providedName = req.body.name

   if(error.status === 400){
        return res.status(error.status).render('unauthorizedViews/register', {providedName, providedEmail, ...error})
    }

    if(error.status === 403  || error.status === 401){
        return res.status(403).render('unauthorizedViews/login', {providedEmail, ...error})
    }

    if(error.name === 'ValidationError'){
        const signInFeedback = convertDatabaseErrorToFeedback(error)
        return res.status(400).render('unauthorizedViews/register', {providedEmail, providedName, ...signInFeedback})
    }
}

function convertDatabaseErrorToFeedback(error){
    const signInFeedback = {
        messages: [],
    }
    const keys = Object.keys(error.errors)

    keys.forEach((key) => {
        signInFeedback.messages.push(error.errors[key].message)  
        signInFeedback.style = `border: 2px solid red; background-color: #ff6969`
    })

    return signInFeedback
}

module.exports = { handleValidationErrors }
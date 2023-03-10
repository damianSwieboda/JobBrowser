const { checkAuthorization } = require('./navigationMiddleware');

const errorHandling = async (error, req, res, next) => {
    const isAuthorized = await checkAuthorization(req);

    const providedEmail = req.body.email;
    const providedName = req.body.name;

    switch (error.name) { 
        case 'ValidationError':
            const signInFeedback = convertDatabaseErrorToFeedback(error);
            signInFeedback.style = `border: 2px solid red; background-color: #ff6969`;
            return res.status(400).render('unauthorizedViews/register', {providedEmail, providedName, ...signInFeedback});

        case 'MissingPageError':
            return res.status(error.status).render('error', {isAuthorized, error});

        case 'EmailIsInUseError':
            return res.status(error.status).render('unauthorizedViews/register', {providedName, providedEmail, ...error});

        case 'AuthError':
            return res.status(error.status).render('unauthorizedViews/login', {providedEmail, ...error});

        case 'ForbiddenError':
            return res.status(error.status).render('unauthorizedViews/login',{...error});

        default:
            return res.status(500).render('error', {isAuthorized, error});
    }
}


function convertDatabaseErrorToFeedback(error){
    const signInFeedback = {
        messages: [],
    };
    const keys = Object.keys(error.errors);

    keys.forEach((key) => {
        signInFeedback.messages.push(error.errors[key].message)  ;
    });

    return signInFeedback;
}

module.exports = { errorHandling } 
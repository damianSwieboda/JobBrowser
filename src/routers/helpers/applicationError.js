class ApplicationError extends Error {
    constructor(messages, status){
        super(messages)
        this.name = this.constructor.name
        this.messages = [messages]|| ''
        this.status = status || 500
    }
};

class MissingPageError extends ApplicationError {
    constructor(messages){
        super(messages || 'Not Found', 404)
    }
};

class EmailIsInUseError extends ApplicationError {
    constructor(messages) {
        super(messages || 'Email already in use', 400)
        this.style = `border: 2px solid red; background-color: #ff6969`;
    }
};

class AuthError extends ApplicationError {
    constructor(messages){
        super(messages || 'Not authorized', 401)
        this.style = `border: 2px solid red; background-color: #ff6969`;
    }
};

class ForbiddenError extends Error {
    constructor(messages) {
        super(messages || 'You do not have permission to access this resource"', 403)
      this.status = 403
    }
};

module.exports = { MissingPageError, EmailIsInUseError, AuthError, ForbiddenError }
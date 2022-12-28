class ApplicationError extends Error {
    constructor(messages, status){
        super()

        this.name = this.constructor.name
        this.messages = [messages] || ''
        this.status = status || 500
        this.style = `border: 2px solid red; background-color: #ff6969`

    }
}

class EmailIsInUseError extends ApplicationError {
    constructor(messages) {
        super(messages || 'Email already in use', 400)
        this.status = 400
      }
}

class AuthError extends ApplicationError {
    constructor(messages){
        super(messages || 'Not authorized', 401)
        this.messages = [messages]
        this.status = 403
    }
}

module.exports = { EmailIsInUseError, AuthError }

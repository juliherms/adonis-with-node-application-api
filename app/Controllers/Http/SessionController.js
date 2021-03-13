'use strict'

/**
 * This controller responsible to create session in the system
 */
class SessionController {

    /**
     * Method responsible to create a token from email and password input
     */
    async store({ request, auth }){
        
        const { email, password } = request.all()

        const token = await auth.attempt(email,password)

        return token
    }
}

module.exports = SessionController

'use strict'

const User = use('App/Models/User')
const Invite = use('App/Models/Invite')

class UserController {

    /**
     * Method responsible to crate user with invite received
     * Create user, check invite and return access token
     *  
     */
    async store ({ request, response, auth }){

        const data = request.only(['name','email','password'])

        //find invite for email. 
        //Case: user was received invite by email
        //Now: user inform your email and register  your data
        const teamsQuery = Invite.query().where('email', data.email)
        const teams = await teamsQuery.pluck('team_id') //return all teams with email

        if(teams.length == 0){
            return response.status(401).send({ message: "You're not invited to any team." })
        }

        const user = await User.create(data)

        await user.teams().attach(teams)

        await teamsQuery.delete() // delete invite

        const token = await auth.attempt(data.email, data.password);

        return token;
    }
}

module.exports = UserController

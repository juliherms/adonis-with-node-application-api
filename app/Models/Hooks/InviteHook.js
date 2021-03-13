'use strict'

const User = use('App/Models/User')
const InviteHook = exports = module.exports = {}


//capture email from invite and send email
InviteHook.sendInvitationEmail = async (invite) => {

    const { email } = invite
    //check user exist in the system
    const invited = await User.findBy('email', email)

    if (invited) {
        await invited.teams().attach(invite.team_id) //add team for user
    } else {
        console.log('Create Account')
    }

    //SEND EMAIL

     
}

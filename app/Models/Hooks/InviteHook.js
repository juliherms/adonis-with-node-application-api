'use strict'

const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')

const InviteHook = exports = module.exports = {}


//capture email from invite and send email
InviteHook.sendInvitationEmail = async (invite) => {

    const { email } = invite
    //check user exist in the system
    const invited = await User.findBy('email', email)

    if (invited) {
        await invited.teams().attach(invite.team_id) //add team for user
    } else {
        
        const user = await invite.user().fetch()
        const team = await invite.team().fetch()

        // Send job email
        Kue.dispatch(Job.key, { user, team, email }, { attempts: 3})

    }
}

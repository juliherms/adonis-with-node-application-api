'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * This class represent Invite in the system
 */
class Invite extends Model {

    static boot() {
        super.boot()
        this.addHook('afterCreate','InviteHook.sendInvitationEmail')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    team (){
        return this.belongsTo('App/Models/Team')
    }
}

module.exports = Invite

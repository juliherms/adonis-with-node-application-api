'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Role = use('Adonis/Acl/Role')

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {

    //find all teams by user authenticated
    const teams = await auth.user.teams().fetch()

    return teams;
  }

  
  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {

    const data = request.only(['name'])

    //create a new team
    const team = await auth.user.teams().create({
      ... data,
      user_id: auth.user.id, 
    })

    //capture team by user
    const teamJoin = await auth.user.teamJoins().where('team_id', team.id).first();
    //find role administrator
    const admin = await Role.findBy('slug','administrator');
    //apply this user to administrator team
    await teamJoin.roles().attach([admin.id]);

    return team
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth }) {

    const team = await auth.user.teams()
      .where('teams.id',params.id)
      .first()

    return team
  }
  
  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    //capture data
    const data = request.only(['name'])
    //find team
    const team = await auth.user.teams()
    .where('teams.id',params.id)
    .first()
    //update team
    team.merge(data)
    //save team
    await team.save()
    // return team
    return team

  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth }) {

    const team = await auth.user.teams()
    .where('teams.id',params.id)
    .first()

    await team.delete()
    
  }
}

module.exports = TeamController

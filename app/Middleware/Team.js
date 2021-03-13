'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Team {
  /**
   * Method responsible to capture team for user request
   * Similar to interceptor 
   */
  async handle ({ request, response, auth }, next) {
   
    //capture team in the header
    const slug = request.header('TEAM')

    let team = null
    //find team
    if(slug){
      team = await auth.user.teams().where('slug',slug).first()
    }

    if(!team){
      return response.status(401).send()
    }

    auth.user.currentTeam = team.id
    request.team = team

    // call next to advance the request
    await next()
  }
}

module.exports = Team

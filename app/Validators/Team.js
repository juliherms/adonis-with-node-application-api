'use strict'

class Team {

  //enable validate All
  get validateAll () {
    return true
  }

  //field validations
  get rules () {
    return {
      name: 'required'
    }
  }
}

module.exports = Team

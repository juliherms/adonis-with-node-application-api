'use strict'

class User {

  //enable validate All
  get validateAll () {
    return true
  }

  //field validations
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required'

    }
  }
}

module.exports = User

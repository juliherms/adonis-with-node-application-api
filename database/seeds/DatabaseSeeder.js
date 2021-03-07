'use strict'

const User = require("../../app/Models/User")

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


const user = use('App/Models/User')

class DatabaseSeeder {

  async run () {

    //create a user
    const user = await User.create({
      name: 'Juliherms Vasconcelos',
      email: 'j.a.vasconcelos321@gmail.com',
      password: '123456'
    })

    //create a team for user
    await user.teams().create({
      name: 'DevTeam',
      user_id: user.id
    })



  }
}

module.exports = DatabaseSeeder

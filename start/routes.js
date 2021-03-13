'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//public routes
//create a token
Route.post('sessions','SessionController.store')


//private routes - authentication required
Route.group(() => {
  Route.resource('teams','TeamController').apiOnly()
}).middleware('auth')

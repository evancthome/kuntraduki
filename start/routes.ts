/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'ProjectsController.projectsShowLatest')

Route.get('register', 'AuthController.registerShow')
Route.post('register', 'AuthController.register')
Route.get('login', 'AuthController.loginShow')
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout')

Route.get('projects/:id/create', 'DocumentsController.showCreateDocument')
Route.post('projects/:id/create', 'DocumentsController.createDocument')

Route.get('projects', 'ProjectsController.projectsShow')
Route.get('projects/:id', 'ProjectsController.projectShow')
Route.post('projects', 'ProjectsController.projectCreate')
Route.post('projects/:id/update', 'ProjectsController.projectUpdate')
Route.get('projects/:id/delete', 'ProjectsController.projectDelete')

Route.get('documents/:id', 'DocumentsController.showDocument')
Route.get('documents/:id/delete', 'DocumentsController.deleteDocument')
Route.post('documents/:id/createsnippet', 'SnippetsController.snippetCreate')

Route.get('snippets/:id/translate', 'TSnippetsController.showTSnippet')
Route.post('snippets/:id/translate', 'TSnippetsController.createTSnippet')
Route.get('snippets/:id/delete', 'SnippetsController.snippetDelete')

Route.get('/tsnippets/:id/iscorrect', 'TSnippetsController.markCorrect')

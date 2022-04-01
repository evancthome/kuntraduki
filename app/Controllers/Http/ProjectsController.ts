import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'
import User from 'App/Models/User'
import Document from 'App/Models/Document'

export default class ProjectsController {
  public async projectsShow({ inertia, auth }) {
    const projects = await Project.query().where('user_id', '=', auth.user.id)

    return inertia.render('projects/Projects', { auth, projects })
  }

  public async projectsShowLatest({ inertia, auth }) {
    const latestProjects = await Project.query().orderBy('updatedAt', 'desc')

    return inertia.render('Home', { auth, latestProjects })
  }

  public async projectShow({ inertia, params, auth }) {
    const project = await Project.findOrFail(params.id)

    const creator = await User.findOrFail(project.user_id)

    const documents = await Document.query().where('project_id', '=', params.id)

    return inertia.render('projects/Project', { project, creator, auth, documents })
  }

  public async projectCreate({ request, response, auth }: HttpContextContract) {
    const projectSchema = schema.create({
      name: schema.string({ trim: true }),
      description: schema.string({ trim: true }),
    })

    const validated = await request.validate({ schema: projectSchema })
    const data = { ...validated, user_id: auth.user!.id }
    await Project.create(data)
    return response.redirect('/projects')
  }

  public async projectUpdate({ params, request, response }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    const desc = request.input('desc')
    project.description = desc
    await project.save()

    return response.redirect(`/projects/${project.id}`)
  }

  public async projectDelete({ response, params, auth }) {
    const user = auth.user
    const project = await Project.findOrFail(params.id)

    if (user.id === project.user_id) {
      await project.delete()
    }

    return response.redirect('/projects')
  }
}

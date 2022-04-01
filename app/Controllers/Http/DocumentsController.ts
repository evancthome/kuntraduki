import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Document from 'App/Models/Document'
import Project from 'App/Models/Project'
import Snippet from 'App/Models/Snippet'

export default class DocumentsController {
  public async showDocument({ inertia, params, auth }) {
    const document = await Document.findOrFail(params.id)
    const snippets = await Snippet.query().where('document_id', params.id).preload('t_snippet')
    const project = await Project.findOrFail(document.projectId)
    return inertia.render('documents/Document', { document, snippets, auth, project })
  }

  public async deleteDocument({ params, auth, response }) {
    const user = auth.user
    const document = await Document.findOrFail(params.id)
    const project = await Project.findOrFail(document.projectId)

    if (user.id === project.user_id) {
      await document.delete()
      return response.redirect(`/projects/${document.projectId}`)
    }

    return response.redirect(`/documents/${document.id}`)
  }

  public async showCreateDocument({ inertia, params, auth }) {
    const projectId = params.id

    return inertia.render('projects/Document', { projectId, auth })
  }

  public async createDocument({ request, response, params }: HttpContextContract) {
    const documentSchema = schema.create({
      title: schema.string({ trim: true }),
      description: schema.string({ trim: true }),
      text: schema.string(),
    })

    const project = await Project.findOrFail(params.id)

    const validated = await request.validate({ schema: documentSchema })

    validated.text = validated.text
      .replace(/[\n\r]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s+|\s+$/, '')

    const data = {
      ...validated,
      project_id: params.id,
      user_id: project.user_id,
      t_text: validated.text,
    }

    await Document.create(data)

    return response.redirect(`/projects/${params.id}`)
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import Snippet from 'App/Models/Snippet'
import Project from 'App/Models/Project'
import TSnippet from 'App/Models/TSnippet'

export default class TSnippetsController {
  public async showTSnippet({ params, inertia }: HttpContextContract) {
    const snippet = await Snippet.findOrFail(params.id)

    return inertia.render('snippets/CreateSnippet', { snippet })
  }

  public async createTSnippet({ request, response, auth, params }: HttpContextContract) {
    const snippet = await Snippet.findOrFail(params.id)
    const tSnippet = request.input('t_snippet')
    const user = auth.user!

    await TSnippet.create({
      t_snippet: tSnippet,
      correct: false,
      user_id: user.id,
      snippetId: snippet.id,
    })

    return response.redirect(`/documents/${snippet.document_id}`)
  }

  public async markCorrect({ params, response, auth }: HttpContextContract) {
    const tSnippet = await TSnippet.findOrFail(params.id)
    const snippet = await Snippet.findOrFail(tSnippet.snippetId)
    const doc = await Document.findOrFail(snippet.document_id)
    const project = await Project.findOrFail(doc.projectId)
    const tDoc = doc.t_text

    if (auth.user?.id === project.user_id) {
      tSnippet.correct = true
      doc.t_text = tDoc.replace(snippet.snippet, tSnippet.$attributes.t_snippet)
      await tSnippet.save()
      await doc.save()
    }

    console.log(doc, snippet, tSnippet)

    return response.redirect(`/documents/${snippet.document_id}`)
  }
}

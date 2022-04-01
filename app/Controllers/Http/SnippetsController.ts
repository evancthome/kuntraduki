import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Snippet from 'App/Models/Snippet'
import Document from 'App/Models/Document'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SnippetsController {
  public async snippetCreate({ params, request, response, auth }: HttpContextContract) {
    const docId = params.id
    const snippetSchema = schema.create({
      snippet: schema.string({ trim: true }),
    })
    const validated = await request.validate({ schema: snippetSchema })
    const data = { ...validated, document_id: docId, user_id: auth.user!.id }

    await Snippet.create(data)
    return response.redirect(`/documents/${docId}`)
  }

  public async snippetDelete({ params, response, auth }) {
    const snippet = await Snippet.findOrFail(params.id)
    const document = await Document.findOrFail(snippet.document_id)

    if (auth.user.id === document.user_id) {
      await snippet.delete()
    }

    return response.redirect(`/documents/${snippet.document_id}`)
  }
}

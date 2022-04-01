import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async registerShow({ inertia }) {
    return inertia.render('auth/Register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    const data = await request.validate({ schema: userSchema })

    const user = await User.create(data)

    auth.login(user)

    return response.redirect('/')
  }

  public async loginShow({ inertia, session }) {
    return inertia.render('auth/Login', { flashMessages: session.flashMessages })
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { uid, password, remember } = request.only(['uid', 'password', 'remember'])

    try {
      await auth.attempt(uid, password, remember)
    } catch (error) {
      session.flash('form', 'Your username, email, or password is incorrect')
      return response.redirect().back()
    }

    return response.redirect('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}

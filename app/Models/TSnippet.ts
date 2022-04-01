import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Snippet from 'App/Models/Snippet'

export default class TSnippet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public correct: boolean

  @column()
  public t_snippet: string

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public snippetId: number

  @belongsTo(() => Snippet)
  public snippet: BelongsTo<typeof Snippet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

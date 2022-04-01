import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Document from 'App/Models/Document'
import User from 'App/Models/User'
import TSnippet from 'App/Models/TSnippet'

export default class Snippet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public snippet: string

  @column()
  public document_id: number

  @belongsTo(() => Document)
  public document: BelongsTo<typeof Document>

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => TSnippet)
  public t_snippet: HasMany<typeof TSnippet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

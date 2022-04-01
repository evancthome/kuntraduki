import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DocumentsAddTtexts extends BaseSchema {
  protected tableName = 'documents'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('t_text')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('t_text')
    })
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateSnippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('snippet').notNullable()
      table.integer('document_id').unsigned().references('documents.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SnippetsAddUserids extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}

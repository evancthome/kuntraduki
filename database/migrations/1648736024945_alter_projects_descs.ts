import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterProjectsDescs extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('description').alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description').notNullable().alter()
    })
  }
}

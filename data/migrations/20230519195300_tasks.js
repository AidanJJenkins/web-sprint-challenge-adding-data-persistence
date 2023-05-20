/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("tasks", (table) => {
      table.increments("task_id")
      table.string("task_description", 128).notNullable()
      table.string("task_notes", 128)
      table.boolean("task_completed").defaultTo(false)
      table.integer("project_id")
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("tasks") 
};

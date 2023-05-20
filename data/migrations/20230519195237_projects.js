/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("projects", (table) => {
      table.increments("project_id")
      table.string("project_name", 128).notNullable()
      table.string("project_description", 128)
      table.boolean("project_completed").defaultTo(false)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects") 
};

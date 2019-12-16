
exports.up = function(knex) {
  return knex.schema.createTable('account', function(table){
    table.increments();
    table.string('email').notNullable().unique();
    table.string('channel').notNullable();
    table.string('genre').notNullable();
    table.integer('rating').notNullable();
    table.boolean('explicit').notNullable();
  });
};

exports.down = function(knex) {
  
};

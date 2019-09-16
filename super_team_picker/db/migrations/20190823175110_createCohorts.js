exports.up = function (knex) {
    return knex.schema.createTable('cohorts', table => {
        table.bigIncrements('id');
        table.string('members');
        table.string('name');
        table.text('logoUrl');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('cohorts');
};
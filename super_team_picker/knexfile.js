// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'super_team_picker'
    },
    migrations: {
      directory: "./db/migrations"
    }
  }

};